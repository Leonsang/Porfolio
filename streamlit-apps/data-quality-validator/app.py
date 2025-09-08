import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import io
import base64
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

# Page configuration
st.set_page_config(
    page_title="Data Quality Validator",
    page_icon="🔍",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
st.markdown("""
<style>
    .main-header {
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        padding: 2rem;
        border-radius: 10px;
        color: white;
        text-align: center;
        margin-bottom: 2rem;
    }
    .metric-card {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-left: 4px solid #667eea;
    }
    .quality-score {
        font-size: 2rem;
        font-weight: bold;
        color: #667eea;
    }
    .stAlert {
        border-radius: 10px;
    }
</style>
""", unsafe_allow_html=True)

# Main header
st.markdown("""
<div class="main-header">
    <h1>🔍 Data Quality Validator</h1>
    <p>Comprehensive data profiling, quality assessment, and anomaly detection tool</p>
</div>
""", unsafe_allow_html=True)

# Sidebar
st.sidebar.title("📊 Data Quality Validator")
st.sidebar.markdown("---")

# File upload
uploaded_file = st.sidebar.file_uploader(
    "Choose a data file",
    type=['csv', 'xlsx', 'xls'],
    help="Upload CSV, Excel, or XLS files"
)

# Configuration options
st.sidebar.markdown("### ⚙️ Configuration")
sample_size = st.sidebar.slider(
    "Sample size for analysis",
    min_value=1000,
    max_value=100000,
    value=10000,
    step=1000,
    help="Larger samples provide more accurate analysis but take longer to process"
)

anomaly_threshold = st.sidebar.slider(
    "Anomaly detection threshold",
    min_value=1.5,
    max_value=3.0,
    value=2.0,
    step=0.1,
    help="Standard deviations for outlier detection"
)

# Main content
if uploaded_file is not None:
    try:
        # Load data
        if uploaded_file.name.endswith('.csv'):
            df = pd.read_csv(uploaded_file)
        else:
            df = pd.read_excel(uploaded_file)
        
        # Sample data if too large
        if len(df) > sample_size:
            df_sample = df.sample(n=sample_size, random_state=42)
            st.info(f"📊 Large dataset detected. Analyzing {sample_size:,} random samples from {len(df):,} total records.")
        else:
            df_sample = df.copy()
        
        # Basic info
        col1, col2, col3, col4 = st.columns(4)
        
        with col1:
            st.metric("Total Records", f"{len(df):,}")
        
        with col2:
            st.metric("Sample Size", f"{len(df_sample):,}")
        
        with col3:
            st.metric("Columns", len(df.columns))
        
        with col4:
            st.metric("Memory Usage", f"{df.memory_usage(deep=True).sum() / 1024**2:.1f} MB")
        
        st.markdown("---")
        
        # Data Overview
        st.subheader("📋 Data Overview")
        
        # Display sample data
        st.markdown("**Sample Data (First 10 rows)**")
        st.dataframe(df_sample.head(10), use_container_width=True)
        
        # Column information
        col1, col2 = st.columns(2)
        
        with col1:
            st.markdown("**Column Information**")
            col_info = pd.DataFrame({
                'Column': df_sample.columns,
                'Data Type': df_sample.dtypes.astype(str),
                'Non-Null Count': df_sample.count(),
                'Null Count': df_sample.isnull().sum(),
                'Null Percentage': (df_sample.isnull().sum() / len(df_sample) * 100).round(2)
            })
            st.dataframe(col_info, use_container_width=True)
        
        with col2:
            st.markdown("**Data Shape**")
            st.write(f"**Rows:** {df_sample.shape[0]:,}")
            st.write(f"**Columns:** {df_sample.shape[1]}")
            st.write(f"**Memory Usage:** {df_sample.memory_usage(deep=True).sum() / 1024**2:.2f} MB")
            
            # Duplicate analysis
            duplicates = df_sample.duplicated().sum()
            st.write(f"**Duplicate Rows:** {duplicates:,}")
            if duplicates > 0:
                st.write(f"**Duplicate Percentage:** {(duplicates / len(df_sample) * 100):.2f}%")
        
        st.markdown("---")
        
        # Data Quality Metrics
        st.subheader("🎯 Data Quality Metrics")
        
        # Calculate quality scores
        quality_metrics = {}
        
        # Completeness score
        completeness = (1 - df_sample.isnull().sum().sum() / (len(df_sample) * len(df_sample.columns))) * 100
        quality_metrics['Completeness'] = completeness
        
        # Consistency score (check for data type consistency)
        consistency_score = 0
        for col in df_sample.columns:
            if df_sample[col].dtype in ['object', 'string']:
                # Check if numeric values exist in string columns
                numeric_count = pd.to_numeric(df_sample[col], errors='coerce').notna().sum()
                if numeric_count > 0:
                    consistency_score += 1
        consistency_score = (1 - consistency_score / len(df_sample.columns)) * 100
        quality_metrics['Consistency'] = consistency_score
        
        # Uniqueness score
        uniqueness = (1 - df_sample.duplicated().sum() / len(df_sample)) * 100
        quality_metrics['Uniqueness'] = uniqueness
        
        # Validity score (basic checks)
        validity_score = 0
        for col in df_sample.columns:
            if df_sample[col].dtype in ['int64', 'float64']:
                # Check for reasonable numeric ranges
                if df_sample[col].notna().sum() > 0:
                    q1 = df_sample[col].quantile(0.25)
                    q3 = df_sample[col].quantile(0.75)
                    iqr = q3 - q1
                    lower_bound = q1 - 1.5 * iqr
                    upper_bound = q3 + 1.5 * iqr
                    outliers = ((df_sample[col] < lower_bound) | (df_sample[col] > upper_bound)).sum()
                    validity_score += (1 - outliers / df_sample[col].notna().sum())
        
        if df_sample.select_dtypes(include=[np.number]).columns.any():
            validity_score = (validity_score / len(df_sample.select_dtypes(include=[np.number]).columns)) * 100
        else:
            validity_score = 100
        
        quality_metrics['Validity'] = validity_score
        
        # Overall quality score
        overall_quality = np.mean(list(quality_metrics.values()))
        quality_metrics['Overall'] = overall_quality
        
        # Display quality metrics
        col1, col2, col3, col4, col5 = st.columns(5)
        
        with col1:
            st.markdown("""
            <div class="metric-card">
                <h3>Completeness</h3>
                <div class="quality-score">{:.1f}%</div>
            </div>
            """.format(quality_metrics['Completeness']), unsafe_allow_html=True)
        
        with col2:
            st.markdown("""
            <div class="metric-card">
                <h3>Consistency</h3>
                <div class="quality-score">{:.1f}%</div>
            </div>
            """.format(quality_metrics['Consistency']), unsafe_allow_html=True)
        
        with col3:
            st.markdown("""
            <div class="metric-card">
                <h3>Uniqueness</h3>
                <div class="quality-score">{:.1f}%</div>
            </div>
            """.format(quality_metrics['Uniqueness']), unsafe_allow_html=True)
        
        with col4:
            st.markdown("""
            <div class="metric-card">
                <h3>Validity</h3>
                <div class="quality-score">{:.1f}%</div>
            </div>
            """.format(quality_metrics['Validity']), unsafe_allow_html=True)
        
        with col5:
            st.markdown("""
            <div class="metric-card">
                <h3>Overall</h3>
                <div class="quality-score">{:.1f}%</div>
            </div>
            """.format(quality_metrics['Overall']), unsafe_allow_html=True)
        
        # Quality score visualization
        fig = go.Figure()
        fig.add_trace(go.Bar(
            x=list(quality_metrics.keys())[:-1],  # Exclude Overall
            y=list(quality_metrics.values())[:-1],
            marker_color=['#667eea', '#764ba2', '#f093fb', '#f5576c'],
            text=[f'{v:.1f}%' for v in list(quality_metrics.values())[:-1]],
            textposition='auto'
        ))
        fig.update_layout(
            title="Data Quality Metrics Breakdown",
            xaxis_title="Quality Dimension",
            yaxis_title="Score (%)",
            yaxis_range=[0, 100],
            height=400
        )
        st.plotly_chart(fig, use_container_width=True)
        
        st.markdown("---")
        
        # Data Profiling
        st.subheader("📊 Data Profiling")
        
        # Select column for detailed analysis
        selected_column = st.selectbox(
            "Select column for detailed analysis",
            df_sample.columns,
            help="Choose a column to see detailed statistics and visualizations"
        )
        
        if selected_column:
            col_data = df_sample[selected_column]
            col_type = col_data.dtype
            
            col1, col2 = st.columns(2)
            
            with col1:
                st.markdown(f"**Column: {selected_column}**")
                st.write(f"**Data Type:** {col_type}")
                st.write(f"**Total Values:** {len(col_data):,}")
                st.write(f"**Non-Null Values:** {col_data.notna().sum():,}")
                st.write(f"**Null Values:** {col_data.isnull().sum():,}")
                st.write(f"**Null Percentage:** {(col_data.isnull().sum() / len(col_data) * 100):.2f}%")
                
                if col_data.dtype in ['int64', 'float64']:
                    st.write(f"**Mean:** {col_data.mean():.2f}")
                    st.write(f"**Median:** {col_data.median():.2f}")
                    st.write(f"**Std Dev:** {col_data.std():.2f}")
                    st.write(f"**Min:** {col_data.min():.2f}")
                    st.write(f"**Max:** {col_data.max():.2f}")
                    
                    # Quartiles
                    q1, q2, q3 = col_data.quantile([0.25, 0.5, 0.75])
                    st.write(f"**Q1 (25%):** {q1:.2f}")
                    st.write(f"**Q2 (50%):** {q2:.2f}")
                    st.write(f"**Q3 (75%):** {q3:.2f}")
                    
                    # IQR and outliers
                    iqr = q3 - q1
                    lower_bound = q1 - anomaly_threshold * iqr
                    upper_bound = q3 + anomaly_threshold * iqr
                    outliers = ((col_data < lower_bound) | (col_data > upper_bound)).sum()
                    st.write(f"**IQR:** {iqr:.2f}")
                    st.write(f"**Outliers:** {outliers:,}")
                    st.write(f"**Outlier Percentage:** {(outliers / len(col_data) * 100):.2f}%")
                
                elif col_data.dtype == 'object':
                    st.write(f"**Unique Values:** {col_data.nunique():,}")
                    st.write(f"**Most Common:** {col_data.mode().iloc[0] if not col_data.mode().empty else 'N/A'}")
                    st.write(f"**Most Common Count:** {col_data.value_counts().iloc[0] if not col_data.value_counts().empty else 0}")
            
            with col2:
                # Visualizations
                if col_data.dtype in ['int64', 'float64']:
                    # Histogram
                    fig_hist = px.histogram(
                        col_data.dropna(),
                        title=f"Distribution of {selected_column}",
                        nbins=30
                    )
                    fig_hist.update_layout(height=300)
                    st.plotly_chart(fig_hist, use_container_width=True)
                    
                    # Box plot
                    fig_box = px.box(
                        col_data.dropna(),
                        title=f"Box Plot of {selected_column}"
                    )
                    fig_box.update_layout(height=300)
                    st.plotly_chart(fig_box, use_container_width=True)
                
                elif col_data.dtype == 'object':
                    # Top values
                    top_values = col_data.value_counts().head(10)
                    fig_bar = px.bar(
                        x=top_values.values,
                        y=top_values.index,
                        orientation='h',
                        title=f"Top 10 Values in {selected_column}"
                    )
                    fig_bar.update_layout(height=400)
                    st.plotly_chart(fig_bar, use_container_width=True)
        
        st.markdown("---")
        
        # Anomaly Detection
        st.subheader("🚨 Anomaly Detection")
        
        numeric_columns = df_sample.select_dtypes(include=[np.number]).columns
        
        if len(numeric_columns) > 0:
            anomaly_results = {}
            
            for col in numeric_columns:
                col_data = df_sample[col].dropna()
                if len(col_data) > 0:
                    q1, q3 = col_data.quantile([0.25, 0.75])
                    iqr = q3 - q1
                    lower_bound = q1 - anomaly_threshold * iqr
                    upper_bound = q3 + anomaly_threshold * iqr
                    
                    outliers = col_data[(col_data < lower_bound) | (col_data > upper_bound)]
                    anomaly_results[col] = {
                        'outliers': outliers,
                        'count': len(outliers),
                        'percentage': (len(outliers) / len(col_data) * 100),
                        'lower_bound': lower_bound,
                        'upper_bound': upper_bound
                    }
            
            # Display anomaly summary
            if anomaly_results:
                anomaly_summary = pd.DataFrame([
                    {
                        'Column': col,
                        'Outlier Count': info['count'],
                        'Outlier Percentage': f"{info['percentage']:.2f}%",
                        'Lower Bound': f"{info['lower_bound']:.2f}",
                        'Upper Bound': f"{info['upper_bound']:.2f}"
                    }
                    for col, info in anomaly_results.items()
                ])
                
                st.markdown("**Anomaly Detection Summary**")
                st.dataframe(anomaly_summary, use_container_width=True)
                
                # Anomaly visualization
                if len(numeric_columns) <= 4:  # Limit to 4 columns for visualization
                    fig_anomaly = make_subplots(
                        rows=2, cols=2,
                        subplot_titles=numeric_columns[:4],
                        specs=[[{"type": "box"}, {"type": "box"}],
                               [{"type": "box"}, {"type": "box"}]]
                    )
                    
                    for i, col in enumerate(numeric_columns[:4]):
                        row = (i // 2) + 1
                        col_pos = (i % 2) + 1
                        
                        col_data = df_sample[col].dropna()
                        fig_anomaly.add_trace(
                            go.Box(y=col_data, name=col),
                            row=row, col=col_pos
                        )
                    
                    fig_anomaly.update_layout(height=600, title="Anomaly Detection - Box Plots")
                    st.plotly_chart(fig_anomaly, use_container_width=True)
        
        st.markdown("---")
        
        # Data Quality Recommendations
        st.subheader("💡 Data Quality Recommendations")
        
        recommendations = []
        
        if quality_metrics['Completeness'] < 90:
            recommendations.append("🔴 **High missing data detected.** Consider data imputation strategies or investigate data collection processes.")
        
        if quality_metrics['Consistency'] < 80:
            recommendations.append("🟡 **Data type inconsistencies found.** Review data validation rules and standardize data formats.")
        
        if quality_metrics['Uniqueness'] < 95:
            recommendations.append("🟡 **Duplicate records identified.** Implement deduplication processes and review data sources.")
        
        if quality_metrics['Validity'] < 85:
            recommendations.append("🔴 **Data validity issues detected.** Review business rules and implement data validation constraints.")
        
        if overall_quality < 80:
            recommendations.append("🔴 **Overall data quality is poor.** Consider comprehensive data quality improvement initiatives.")
        elif overall_quality < 90:
            recommendations.append("🟡 **Data quality needs improvement.** Focus on identified issues to reach good quality standards.")
        else:
            recommendations.append("🟢 **Data quality is good.** Maintain current standards and monitor for degradation.")
        
        for rec in recommendations:
            st.markdown(rec)
        
        if not recommendations:
            st.success("🎉 No specific recommendations at this time. Your data quality looks good!")
        
        st.markdown("---")
        
        # Export Report
        st.subheader("📄 Export Report")
        
        if st.button("📊 Generate PDF Report"):
            # Create a simple report
            report_data = {
                'Data Quality Report': {
                    'Generated': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    'File': uploaded_file.name,
                    'Total Records': len(df),
                    'Sample Size': len(df_sample),
                    'Columns': len(df.columns)
                },
                'Quality Metrics': quality_metrics,
                'Recommendations': recommendations
            }
            
            st.success("📄 Report generated successfully!")
            st.json(report_data)
            
            # Download button (simplified)
            csv = df_sample.to_csv(index=False)
            st.download_button(
                label="📥 Download Sample Data (CSV)",
                data=csv,
                file_name=f"data_quality_sample_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv",
                mime="text/csv"
            )
    
    except Exception as e:
        st.error(f"❌ Error processing file: {str(e)}")
        st.exception(e)

else:
    # Welcome message
    st.markdown("""
    ## 🚀 Welcome to Data Quality Validator!
    
    This tool helps you:
    
    - **📊 Analyze data quality** across multiple dimensions
    - **🔍 Detect anomalies** and outliers in your datasets
    - **📈 Generate comprehensive reports** with visualizations
    - **💡 Get actionable recommendations** for data improvement
    
    ### 📁 How to use:
    1. **Upload your data file** (CSV, Excel, or XLS) using the sidebar
    2. **Configure analysis parameters** if needed
    3. **Review the comprehensive analysis** including:
       - Data overview and statistics
       - Quality metrics and scores
       - Anomaly detection results
       - Detailed column profiling
       - Actionable recommendations
    
    ### 🎯 Supported file formats:
    - CSV files (.csv)
    - Excel files (.xlsx, .xls)
    
    ### 📊 Quality Dimensions Analyzed:
    - **Completeness**: Missing data analysis
    - **Consistency**: Data type and format consistency
    - **Uniqueness**: Duplicate record detection
    - **Validity**: Data range and business rule validation
    
    Start by uploading your data file in the sidebar! 🎉
    """)
    
    # Sample data for demonstration
    st.markdown("---")
    st.markdown("### 📊 Sample Data for Testing")
    
    # Generate sample data
    np.random.seed(42)
    sample_data = pd.DataFrame({
        'customer_id': range(1, 1001),
        'age': np.random.normal(35, 10, 1000).round(0),
        'income': np.random.lognormal(10, 0.5, 1000).round(2),
        'purchase_amount': np.random.exponential(100, 1000).round(2),
        'satisfaction_score': np.random.choice([1, 2, 3, 4, 5], 1000, p=[0.1, 0.15, 0.2, 0.3, 0.25]),
        'email': [f'customer{i}@example.com' for i in range(1, 1001)],
        'last_purchase_date': pd.date_range('2023-01-01', periods=1000, freq='D')
    })
    
    # Add some data quality issues for demonstration
    sample_data.loc[np.random.choice(1000, 50, replace=False), 'age'] = np.nan
    sample_data.loc[np.random.choice(1000, 30, replace=False), 'income'] = -1000
    sample_data.loc[np.random.choice(1000, 20, replace=False), 'purchase_amount'] = 999999
    
    st.markdown("**Try with this sample data:**")
    st.dataframe(sample_data.head(10), use_container_width=True)
    
    # Download sample data
    csv = sample_data.to_csv(index=False)
    st.download_button(
        label="📥 Download Sample Data (CSV)",
        data=csv,
        file_name="sample_data_quality_demo.csv",
        mime="text/csv"
    )

# Footer
st.markdown("---")
st.markdown("""
<div style="text-align: center; color: #666; padding: 2rem;">
    <p>🔍 Data Quality Validator | Built with Streamlit | Created by Erick Sang Cifuentes</p>
    <p>For more data engineering tools, visit: <a href="https://ericksang.dev" target="_blank">ericksang.dev</a></p>
</div>
""", unsafe_allow_html=True)
