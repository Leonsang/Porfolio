# 🔍 Data Quality Validator

A comprehensive data quality assessment and profiling tool built with Streamlit, designed to help data engineers and analysts evaluate the quality of their datasets.

## 🚀 Features

### 📊 Data Quality Metrics
- **Completeness**: Missing data analysis and scoring
- **Consistency**: Data type and format consistency checks
- **Uniqueness**: Duplicate record detection and scoring
- **Validity**: Data range validation and business rule checks
- **Overall Quality Score**: Comprehensive quality assessment

### 🔍 Data Profiling
- **Statistical Analysis**: Mean, median, standard deviation, quartiles
- **Data Type Detection**: Automatic identification of numeric, categorical, and date columns
- **Missing Data Analysis**: Detailed breakdown of null values
- **Duplicate Detection**: Identification and quantification of duplicate records

### 🚨 Anomaly Detection
- **Outlier Detection**: IQR-based anomaly identification with configurable thresholds
- **Visual Analysis**: Box plots and histograms for outlier visualization
- **Statistical Summary**: Comprehensive outlier statistics and recommendations

### 📈 Visualizations
- **Interactive Charts**: Built with Plotly for rich, interactive visualizations
- **Quality Score Breakdown**: Bar charts showing quality dimension scores
- **Distribution Analysis**: Histograms and box plots for data distribution
- **Anomaly Visualization**: Multi-panel charts for outlier analysis

### 📄 Reporting
- **Comprehensive Reports**: Detailed quality assessment summaries
- **Actionable Recommendations**: Specific suggestions for data quality improvement
- **Export Capabilities**: Download processed data and analysis results

## 🛠️ Installation

### Prerequisites
- Python 3.8 or higher
- pip package manager

### Setup
1. Clone the repository:
```bash
git clone <repository-url>
cd streamlit-apps/data-quality-validator
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
streamlit run app.py
```

## 📁 Supported File Formats

- **CSV files** (.csv)
- **Excel files** (.xlsx, .xls)

## 🎯 How to Use

### 1. Upload Data
- Use the sidebar to upload your data file
- Supported formats: CSV, Excel, XLS
- Large datasets are automatically sampled for performance

### 2. Configure Analysis
- **Sample Size**: Adjust the number of records to analyze (1,000 - 100,000)
- **Anomaly Threshold**: Set the sensitivity for outlier detection (1.5 - 3.0 standard deviations)

### 3. Review Results
- **Data Overview**: Basic statistics and column information
- **Quality Metrics**: Comprehensive quality scores across all dimensions
- **Data Profiling**: Detailed analysis of selected columns
- **Anomaly Detection**: Outlier identification and visualization
- **Recommendations**: Actionable suggestions for improvement

### 4. Export Results
- Generate comprehensive quality reports
- Download processed data samples
- Save analysis results for further processing

## 📊 Quality Dimensions Explained

### Completeness
Measures the presence of missing data in your dataset. A high completeness score indicates minimal missing values, while a low score suggests significant data gaps that may require attention.

### Consistency
Evaluates the uniformity of data types and formats across columns. Inconsistencies (e.g., numeric values in string columns) can indicate data quality issues that need resolution.

### Uniqueness
Assesses the presence of duplicate records. High uniqueness indicates clean, non-redundant data, while low uniqueness suggests the need for deduplication processes.

### Validity
Checks if data values fall within expected ranges and conform to business rules. This includes outlier detection and validation against defined constraints.

## 🔧 Configuration Options

### Sample Size
- **Small (1,000-5,000)**: Quick analysis, suitable for initial assessment
- **Medium (5,000-20,000)**: Balanced performance and accuracy
- **Large (20,000-100,000)**: Comprehensive analysis, longer processing time

### Anomaly Threshold
- **Conservative (1.5)**: Detects only extreme outliers
- **Standard (2.0)**: Balanced outlier detection
- **Aggressive (3.0)**: Detects subtle anomalies

## 📈 Performance Considerations

- **Large Datasets**: Automatically samples data for optimal performance
- **Memory Usage**: Displays memory consumption for monitoring
- **Processing Time**: Scales with sample size and data complexity

## 🚀 Deployment

### Streamlit Cloud
1. Push your code to GitHub
2. Connect your repository to Streamlit Cloud
3. Deploy with automatic dependency management

### Local Deployment
```bash
streamlit run app.py --server.port 8501 --server.address 0.0.0.0
```

### Docker Deployment
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8501
CMD ["streamlit", "run", "app.py", "--server.port=8501", "--server.address=0.0.0.0"]
```

## 🔍 Use Cases

### Data Engineering
- **ETL Pipeline Validation**: Assess data quality before and after transformations
- **Data Lake Assessment**: Evaluate the quality of raw data sources
- **Migration Validation**: Verify data integrity during system migrations

### Data Analysis
- **Exploratory Analysis**: Understand data characteristics before analysis
- **Quality Assessment**: Identify data issues that may affect analysis results
- **Reporting**: Generate quality reports for stakeholders

### Business Intelligence
- **Dashboard Validation**: Ensure data quality for BI dashboards
- **KPI Monitoring**: Track data quality metrics over time
- **Compliance**: Meet data quality requirements for regulatory compliance

## 🛠️ Customization

### Adding Custom Quality Checks
```python
# Example: Custom business rule validation
def custom_validity_check(data, column):
    # Implement your business logic here
    return validity_score

# Add to quality_metrics calculation
quality_metrics['CustomValidity'] = custom_validity_check(df_sample, 'column_name')
```

### Custom Visualizations
```python
# Example: Custom chart
import plotly.graph_objects as go

fig = go.Figure(data=go.Bar(x=['A', 'B'], y=[1, 2]))
st.plotly_chart(fig)
```

## 📚 Dependencies

- **Streamlit**: Web application framework
- **Pandas**: Data manipulation and analysis
- **NumPy**: Numerical computing
- **Plotly**: Interactive visualizations
- **OpenPyXL**: Excel file support
- **XLRD**: Legacy Excel file support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Erick Sang Cifuentes**
- Data Engineer with 5+ years of experience
- Specialized in ETL pipelines, cloud migration, and data warehousing
- Portfolio: [ericksang.dev](https://ericksang.dev)
- LinkedIn: [esangc](https://linkedin.com/in/esangc)

## 🙏 Acknowledgments

- Streamlit team for the excellent framework
- Plotly for interactive visualizations
- Pandas and NumPy communities for data science tools

---

**Built with ❤️ for the data engineering community**
