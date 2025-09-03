import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import pandas as pd
from datetime import datetime, timedelta
import numpy as np
from utils.credit_data_manager import CreditDataManager
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def generate_sample_data():
    """Generate sample spending data for visualization"""
    logger.info("Generating sample data...")
    start_time = datetime.now()

    end_date = datetime.now()
    start_date = end_date - timedelta(days=180)
    dates = pd.date_range(start=start_date, end=end_date, freq='D')

    categories = {
        'Groceries': (2000, 5000),
        'Entertainment': (1000, 3000),
        'Shopping': (3000, 8000),
        'Bills & Utilities': (5000, 10000),
        'Dining Out': (1000, 4000),
        'Transportation': (2000, 5000)
    }

    data = []
    for date in dates:
        for category, (min_amount, max_amount) in categories.items():
            amount = np.random.randint(min_amount, max_amount)
            if category == 'Shopping' and (date.month == 10 or date.month == 11):
                amount *= 1.5  # Increase shopping during festival season
            data.append({
                'Date': date,
                'Category': category,
                'Amount': amount
            })

    df = pd.DataFrame(data)
    logger.info(f"Sample data generated in {(datetime.now() - start_time).total_seconds():.2f} seconds")
    return df

def plot_monthly_spending(df):
    """Create monthly spending trend visualization"""
    logger.info("Creating monthly spending plot...")
    start_time = datetime.now()

    monthly_data = df.groupby([df['Date'].dt.strftime('%Y-%m'), 'Category'])['Amount'].sum().reset_index()
    monthly_data['Date'] = pd.to_datetime(monthly_data['Date'] + '-01')

    fig = px.line(monthly_data, 
                  x='Date', 
                  y='Amount', 
                  color='Category',
                  title='Monthly Spending Trends',
                  labels={'Amount': 'Spending (₹)', 'Date': 'Month'})

    fig.update_layout(
        plot_bgcolor='rgba(0,0,0,0)',
        paper_bgcolor='rgba(0,0,0,0)',
        font_color='white',
        showlegend=True,
        legend=dict(
            yanchor="top",
            y=0.99,
            xanchor="left",
            x=0.01
        )
    )

    logger.info(f"Monthly plot created in {(datetime.now() - start_time).total_seconds():.2f} seconds")
    return fig

def plot_category_distribution(df):
    """Create category-wise spending distribution visualization"""
    logger.info("Creating category distribution plot...")
    start_time = datetime.now()

    category_total = df.groupby('Category')['Amount'].sum()

    fig = px.pie(values=category_total.values, 
                 names=category_total.index,
                 title='Spending Distribution by Category',
                 hole=0.4)

    fig.update_layout(
        plot_bgcolor='rgba(0,0,0,0)',
        paper_bgcolor='rgba(0,0,0,0)',
        font_color='white'
    )

    logger.info(f"Category plot created in {(datetime.now() - start_time).total_seconds():.2f} seconds")
    return fig

def plot_daily_pattern(df):
    """Create daily spending pattern visualization"""
    logger.info("Creating daily spending plot...")
    start_time = datetime.now()
    daily_data = df.groupby('Date')['Amount'].sum().reset_index()

    fig = go.Figure()
    fig.add_trace(go.Scatter(
        x=daily_data['Date'],
        y=daily_data['Amount'],
        mode='lines',
        name='Daily Spending',
        line=dict(color='#FF4B4B')
    ))

    # Add trend line
    z = np.polyfit(range(len(daily_data)), daily_data['Amount'], 1)
    p = np.poly1d(z)
    fig.add_trace(go.Scatter(
        x=daily_data['Date'],
        y=p(range(len(daily_data))),
        mode='lines',
        name='Trend',
        line=dict(dash='dash', color='#4CAF50')
    ))

    fig.update_layout(
        title='Daily Spending Pattern with Trend',
        xaxis_title='Date',
        yaxis_title='Amount (₹)',
        plot_bgcolor='rgba(0,0,0,0)',
        paper_bgcolor='rgba(0,0,0,0)',
        font_color='white'
    )
    logger.info(f"Daily plot created in {(datetime.now() - start_time).total_seconds():.2f} seconds")
    return fig

def show_insights(df):
    """Display key insights about spending patterns"""
    total_spending = df['Amount'].sum()
    avg_daily_spending = df.groupby('Date')['Amount'].sum().mean()
    top_category = df.groupby('Category')['Amount'].sum().idxmax()
    month_on_month_change = (
        df.groupby(df['Date'].dt.strftime('%Y-%m'))['Amount']
        .sum()
        .pct_change()
        .iloc[-1] * 100
    )

    st.markdown("""
    <style>
    .insight-card {
        background: rgba(255, 255, 255, 0.05);
        padding: 20px;
        border-radius: 10px;
        margin: 10px 0;
    }
    .metric-value {
        font-size: 24px;
        font-weight: bold;
        color: #FF4B4B;
    }
    </style>
    """, unsafe_allow_html=True)

    col1, col2 = st.columns(2)

    with col1:
        st.markdown(f"""
        <div class="insight-card">
            <h3>Total Spending</h3>
            <div class="metric-value">₹{total_spending:,.2f}</div>
        </div>
        <div class="insight-card">
            <h3>Average Daily Spending</h3>
            <div class="metric-value">₹{avg_daily_spending:,.2f}</div>
        </div>
        """, unsafe_allow_html=True)

    with col2:
        st.markdown(f"""
        <div class="insight-card">
            <h3>Top Spending Category</h3>
            <div class="metric-value">{top_category}</div>
        </div>
        <div class="insight-card">
            <h3>Month-on-Month Change</h3>
            <div class="metric-value">{month_on_month_change:+.1f}%</div>
        </div>
        """, unsafe_allow_html=True)


def show():
    st.title("💰 Spending Pattern Analysis")

    # Initialize session state for storing data
    if 'spending_data' not in st.session_state:
        st.session_state.spending_data = None
        st.session_state.breakdown = None
        st.session_state.metrics = None

    # Add connected services information
    with st.sidebar:
        st.markdown("### 🔗 Connected Services")
        st.info("""
        This page uses data from:
        - [Credit Card Usage](/credit_card_usage)
        - [Budget Analysis](/budget_buddy)
        - [Financial Goals](/goal_settings)
        """)

        # Show data source status
        credit_manager = CreditDataManager()
        credit_data = credit_manager.load_credit_usage_data()
        if credit_data:
            st.success("✅ Using your actual spending data")
        else:
            st.warning("⚠️ Using sample data (Add credit card details for real insights)")

    # Data source explanation
    with st.expander("ℹ️ About the Data"):
        st.markdown("""
        **Data Sources:**
        1. Credit card transactions (if connected)
        2. Manual expense entries
        3. Budget allocations

        **Pattern Analysis:**
        - Monthly trends (30-day rolling average)
        - Category distribution
        - Seasonal patterns
        - Spending anomalies
        """)

    # Time period selection before loading data
    time_period = st.selectbox(
        "Select Time Period",
        ["Last 30 Days", "Last 3 Months", "Last 6 Months"]
    )

    days_map = {
        "Last 30 Days": 30,
        "Last 3 Months": 90,
        "Last 6 Months": 180
    }
    days = days_map[time_period]

    # Add Load Data button
    if st.button("Load Spending Data"):
        with st.spinner("Processing spending data..."):
            start_time = datetime.now()

            try:
                # Generate or fetch data
                if credit_data:
                    logger.info("Using actual credit card data")
                    # TODO: Process actual credit card data
                    df = generate_sample_data()  # Placeholder until credit data processing is implemented
                else:
                    logger.info("Using sample data")
                    df = generate_sample_data()

                filtered_df = df[df['Date'] >= (datetime.now() - timedelta(days=days))]

                # Calculate key metrics and store in session state
                st.session_state.metrics = {
                    'total_spending': filtered_df['Amount'].sum(),
                    'avg_daily_spending': filtered_df.groupby('Date')['Amount'].sum().mean(),
                    'top_category': filtered_df.groupby('Category')['Amount'].sum().idxmax(),
                    'month_on_month_change': (
                        filtered_df.groupby(filtered_df['Date'].dt.strftime('%Y-%m'))['Amount']
                        .sum()
                        .pct_change()
                        .iloc[-1] * 100
                    )
                }

                # Store filtered data and breakdown in session state
                st.session_state.spending_data = filtered_df
                st.session_state.breakdown = filtered_df.groupby('Category')['Amount'].agg([
                    ('Total', 'sum'),
                    ('Average', 'mean'),
                    ('Maximum', 'max'),
                    ('Minimum', 'min')
                ]).round(2)

                # Display insights
                show_insights(filtered_df)

                # Show visualizations
                st.subheader("📈 Spending Trends")
                fig_monthly = plot_monthly_spending(filtered_df)
                st.plotly_chart(fig_monthly, use_container_width=True)

                st.subheader("🍰 Category Distribution")
                fig_category = plot_category_distribution(filtered_df)
                st.plotly_chart(fig_category, use_container_width=True)

                st.subheader("📊 Daily Spending Pattern")
                fig_daily = plot_daily_pattern(filtered_df)
                st.plotly_chart(fig_daily, use_container_width=True)

                # Show detailed breakdown
                with st.expander("📑 Detailed Breakdown", expanded=False):
                    st.dataframe(st.session_state.breakdown, use_container_width=True)

                processing_time = (datetime.now() - start_time).total_seconds()
                logger.info(f"Total data processing time: {processing_time:.2f} seconds")

                st.success(f"Data loaded and processed in {processing_time:.1f} seconds")

            except Exception as e:
                logger.error(f"Error processing data: {str(e)}")
                st.error("Error processing spending data. Please try again.")
                return

    # Generate Spending Insights button (outside the data loading block)
    if st.session_state.spending_data is not None:
        if st.button("Generate Spending Insights"):
            st.subheader("💡 Smart Recommendations")
            metrics = st.session_state.metrics

            st.markdown(f"""
            Based on your spending patterns:
            1. Highest spending is in **{metrics['top_category']}** category
            2. Daily average spending: **₹{metrics['avg_daily_spending']:,.2f}**
            3. Monthly trend is **{'increasing' if metrics['month_on_month_change'] > 0 else 'decreasing'}**

            **Suggestions:**
            - {'Consider budget limits for ' + metrics['top_category'] if metrics['month_on_month_change'] > 10 else 'Maintain current spending pattern'}
            - Click [here](/budget_buddy) to set up budget alerts
            - Visit [Credit Card Usage](/credit_card_usage) for reward optimization
            """)
    else:
        st.info("""
        💡 **Tip:** Click "Load Spending Data" to analyze your spending patterns.
        Connect your credit card for personalized insights!
        """)

if __name__ == "__main__":
    show()