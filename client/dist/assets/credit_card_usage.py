import streamlit as st
import plotly.express as px
import pandas as pd
from datetime import datetime, timedelta
from utils.credit_data_manager import CreditDataManager
from utils.navigation import create_breadcrumb
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def show_celebration_animation(score_improvement):
    """Show a celebratory animation based on score improvement"""
    celebration_html = f"""
    <div class="celebration" style="text-align: center; animation: bounce 1s infinite;">
        <h2 style="font-size: 2em; color: #FFD700;">🎉 +{score_improvement} Points! 🎉</h2>
        <style>
            @keyframes bounce {{
                0%, 100% {{ transform: translateY(0); }}
                50% {{ transform: translateY(-20px); }}
            }}
            .celebration {{
                padding: 20px;
                background: linear-gradient(45deg, rgba(255,215,0,0.1), rgba(255,215,0,0.2));
                border-radius: 10px;
                margin: 20px 0;
            }}
            .milestone-card {{
                background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
                padding: 15px;
                border-radius: 10px;
                margin: 10px 0;
                border: 1px solid #FFD700;
                animation: glow 2s infinite;
            }}
            @keyframes glow {{
                0%, 100% {{ box-shadow: 0 0 5px #FFD700; }}
                50% {{ box-shadow: 0 0 20px #FFD700; }}
            }}
        </style>
    </div>
    """
    st.markdown(celebration_html, unsafe_allow_html=True)

def show_milestone_card(title, description, icon):
    """Show an animated milestone card"""
    milestone_html = f"""
    <div class="milestone-card">
        <h3 style="margin:0; color: #FFD700;">{icon} {title}</h3>
        <p style="margin:5px 0 0 0; color: #FFFFFF;">{description}</p>
    </div>
    """
    st.markdown(milestone_html, unsafe_allow_html=True)

def show_credit_utilization_chart(current_utilization=None):
    """Create an interactive credit utilization impact chart"""
    utilization_data = {
        'Utilization %': [10, 20, 30, 50, 70, 90],
        'Score Impact': [95, 90, 85, 70, 50, 30]
    }
    df = pd.DataFrame(utilization_data)

    fig = px.line(
        df, 
        x='Utilization %', 
        y='Score Impact',
        title='Credit Score Impact vs Credit Utilization',
        labels={'Score Impact': 'Credit Score Impact %'}
    )

    if current_utilization:
        fig.add_scatter(
            x=[current_utilization],
            y=[df['Score Impact'].iloc[(df['Utilization %'] - current_utilization).abs().argsort()[0]]],
            mode='markers',
            name='Your Utilization',
            marker=dict(size=12, color='red')
        )

    fig.update_layout(
        plot_bgcolor='rgba(255, 255, 255, 0.05)',
        paper_bgcolor='rgba(0, 0, 0, 0)'
    )
    return fig

def get_ai_card_recommendations(spending_pattern, card_type):
    """AI-based card usage recommendations"""
    recommendations = {
        "Rewards": {
            "Groceries": "Use card for monthly groceries to earn 5x rewards",
            "Travel": "Book through card portal for bonus miles",
            "Shopping": "Time big purchases with reward multipliers"
        },
        "Travel": {
            "Travel": "Use complimentary lounge access and forex benefits",
            "Dining": "Extra rewards on international transactions",
            "Hotels": "Get free hotel nights with point conversion"
        },
        "Shopping": {
            "Online": "Stack card offers with e-commerce sales",
            "Electronics": "Use extended warranty protection",
            "Fashion": "Access exclusive brand partnerships"
        }
    }
    return recommendations.get(card_type, {}).get(spending_pattern, "Maximize regular spending rewards")

def show_credit_challenges():
    """Display credit score challenges and rewards"""
    st.subheader("🏆 Credit Score Challenges")

    # Challenge Progress
    challenges = {
        "Perfect Payment Streak": {
            "description": "Make all payments on time for 3 months",
            "progress": 2,
            "total": 3,
            "reward": "Gold Badge + ₹500 Cashback"
        },
        "Low Utilization Master": {
            "description": "Keep utilization below 30% for 2 months",
            "progress": 1,
            "total": 2,
            "reward": "Silver Badge + ₹300 Cashback"
        },
        "Credit Mix Pro": {
            "description": "Maintain diverse credit types",
            "progress": 2,
            "total": 4,
            "reward": "Platinum Badge + Free Credit Report"
        }
    }

    for name, data in challenges.items():
        progress = data["progress"] / data["total"]
        st.progress(progress, text=name)
        col1, col2 = st.columns([3, 1])
        with col1:
            st.write(f"**{data['description']}**")
            st.write(f"Progress: {data['progress']}/{data['total']}")
        with col2:
            st.info(f"🎁 Reward: {data['reward']}")

def show_minimum_payment_analysis(balance, interest_rate):
    """Calculate and display minimum payment analysis"""
    st.markdown("""
    <style>
    .impact-card {
        background: rgba(255, 255, 255, 0.05);
        padding: 15px;
        border-radius: 10px;
        margin: 10px 0;
    }
    .warning-text {
        color: #ff4b4b;
        font-weight: bold;
    }
    .info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin: 15px 0;
    }
    </style>
    """, unsafe_allow_html=True)

    # Calculate minimum payment (typically 2.5% to 5% of balance)
    min_payment = max(balance * 0.025, 100)  # 2.5% or ₹100, whichever is higher

    # Calculate time to pay off and total interest if paying only minimum
    remaining_balance = balance
    months = 0
    total_interest = 0
    total_paid = 0
    monthly_payments = []

    while remaining_balance > 0 and months < 360:  # Cap at 30 years
        months += 1
        monthly_interest = (remaining_balance * (interest_rate/100))/12
        total_interest += monthly_interest

        payment = max(min_payment, remaining_balance + monthly_interest)
        total_paid += payment
        remaining_balance = remaining_balance + monthly_interest - payment

        monthly_payments.append({
            'Month': months,
            'Balance': remaining_balance,
            'Interest': monthly_interest,
            'Payment': payment
        })

    # Create visualization
    df = pd.DataFrame(monthly_payments)
    fig = px.line(df, x='Month', y=['Balance', 'Interest'], 
                 title='Balance and Interest Over Time with Minimum Payments',
                 labels={'value': 'Amount (₹)', 'variable': 'Type'})

    st.subheader("🔍 Minimum Payment Analysis")

    col1, col2 = st.columns(2)
    with col1:
        st.markdown(f"""
        <div class="impact-card">
            <h3>Monthly Minimum Due</h3>
            <p>₹{min_payment:,.2f}</p>
            <small>2.5% of balance or ₹100, whichever is higher</small>
        </div>
        """, unsafe_allow_html=True)

    with col2:
        st.markdown(f"""
        <div class="impact-card">
            <h3>Time to Pay Off</h3>
            <p class="warning-text">{months} months ({months/12:.1f} years)</p>
            <small>Assuming no new purchases</small>
        </div>
        """, unsafe_allow_html=True)

    st.markdown(f"""
    <div class="impact-card">
        <h3>Financial Impact</h3>
        <div class="info-grid">
            <div>
                <strong>Total Interest Paid:</strong>
                <p class="warning-text">₹{total_interest:,.2f}</p>
            </div>
            <div>
                <strong>Total Amount Paid:</strong>
                <p class="warning-text">₹{total_paid:,.2f}</p>
            </div>
            <div>
                <strong>Interest as % of Original:</strong>
                <p class="warning-text">{(total_interest/balance)*100:.1f}%</p>
            </div>
            <div>
                <strong>Monthly Interest:</strong>
                <p>₹{(balance * (interest_rate/100))/12:,.2f}</p>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)

    st.plotly_chart(fig, use_container_width=True)

    # Credit Score Impact
    st.subheader("📊 Credit Score Impact")
    st.markdown("""
    <div class="impact-card">
        <h3>Making Only Minimum Payments Can Affect Your Credit Score</h3>
        <ul>
            <li><strong>Credit Utilization:</strong> High balances carried forward affect your credit utilization ratio</li>
            <li><strong>Payment History:</strong> While minimum payments maintain a positive payment history, high utilization may offset this benefit</li>
            <li><strong>Debt Burden:</strong> Long-term high balances suggest higher credit risk</li>
        </ul>
        <p class="warning-text">Recommendation: Pay more than the minimum whenever possible to reduce interest and improve credit score</p>
    </div>
    """, unsafe_allow_html=True)

    # Smart Payment Strategies
    st.subheader("💡 Smart Payment Strategies")
    st.markdown("""
    <div class="impact-card">
        <h3>Better Alternatives to Minimum Payments</h3>
        <ul>
            <li><strong>Fixed Amount Strategy:</strong> Pay a fixed amount higher than the minimum payment</li>
            <li><strong>Percentage Strategy:</strong> Pay 10-15% of the balance instead of 2.5%</li>
            <li><strong>Full Balance Strategy:</strong> Pay the full balance to avoid interest charges</li>
            <li><strong>Debt Avalanche:</strong> Pay minimum on all cards but put extra money on highest-interest card</li>
        </ul>
    </div>
    """, unsafe_allow_html=True)


def show():
    st.title("💳 Smart Credit Card Management")

    create_breadcrumb(
        "Credit Card Management",
        [{"name": "Tools", "link": "#"}]
    )

    # Initialize data manager
    try:
        data_manager = CreditDataManager()
        logger.info("CreditDataManager initialized successfully")
    except Exception as e:
        st.error("Failed to initialize credit data manager")
        logger.error(f"Error initializing CreditDataManager: {str(e)}")
        return

    # Show Connected Features
    with st.sidebar:
        st.markdown("### 🔗 Connected Features")
        st.info("""
        Your credit data powers these features:
        - 📊 [Credit Score](/credit_score)
        - 💰 [Debt Payoff](/debt_payoff)
        - 📈 [Risk Assessment](/risk_assessment)
        - 📱 [Spending Patterns](/spending_patterns)
        """)

        # Show data integration status
        credit_data = data_manager.load_credit_usage_data()
        if credit_data:
            st.success("✅ Credit data is powering connected features")
            # Show quick stats
            credit_score = data_manager.calculate_credit_score(credit_data[-1])
            if credit_score:
                st.metric(
                    "Current Credit Score",
                    credit_score,
                    help="Based on your credit behavior"
                )
        else:
            st.warning("⚠️ Add credit card details to enable feature integration")

    tabs = st.tabs([
        "Card Analyzer & AI Recommendations",
        "Credit Score Improvement",
        "Smart Spending Guide",
        "Minimum Payment Impact",
        "Gamification & Benefits"  
    ])

    # Card Analyzer & AI Recommendations Tab
    with tabs[0]:
        st.header("💡 Smart Card Analyzer")
        col1, col2 = st.columns(2)

        with col1:
            card_type = st.selectbox(
                "Card Type",
                ["Rewards", "Travel", "Shopping", "Business", "Fuel", "Premium"]
            )
            monthly_spend = st.number_input(
                "Monthly Spend (₹)",
                min_value=1000,
                value=25000,
                step=1000
            )

        with col2:
            spending_categories = st.multiselect(
                "Major Spending Categories",
                ["Groceries", "Travel", "Online", "Dining", "Fuel", "Entertainment"]
            )
            card_limit = st.number_input(
                "Credit Limit (₹)",
                min_value=5000,
                value=50000,
                step=5000
            )

        if st.button("Get Smart Recommendations", use_container_width=True):
            # Save credit card usage data
            try:
                credit_usage_data = {
                    'card_type': card_type,
                    'monthly_spend': monthly_spend,
                    'spending_categories': spending_categories,
                    'card_limit': card_limit,
                    'credit_utilization': (monthly_spend / card_limit * 100) if card_limit > 0 else 0,
                    'spending_by_category': {
                        category: monthly_spend / len(spending_categories)
                        for category in spending_categories
                    } if spending_categories else {}
                }

                if data_manager.save_credit_usage_data(credit_usage_data):
                    st.success("✅ Credit data saved and synced with connected features!")

                    # Show integration updates
                    with st.expander("🔄 Feature Updates", expanded=True):
                        col1, col2 = st.columns(2)
                        with col1:
                            st.info("📊 Credit Score: Updated based on utilization")
                            st.info("💰 Debt Payoff: Recalculated strategies")
                        with col2:
                            st.info("📈 Risk Profile: Adjusted based on new data")
                            st.info("📱 Spending Analysis: Updated patterns")

                # Show AI Recommendations
                for category in spending_categories:
                    rec = get_ai_card_recommendations(category, card_type)
                    st.info(f"**{category}**: {rec}")

                # Show Reward Optimization
                st.subheader("🎁 Reward Optimization")
                potential_rewards = monthly_spend * 0.02  # 2% average reward rate
                st.metric(
                    "Potential Monthly Rewards",
                    f"₹{potential_rewards:,.2f}",
                    "Based on current spending"
                )

                # Show Zero-Cost EMI Opportunities
                if monthly_spend > 10000:
                    st.success("""
                    💰 **Zero-Cost EMI Opportunity**
                    - Available for purchases above ₹10,000
                    - No interest charges
                    - Processing fee may apply
                    """)

            except Exception as e:
                st.error("Failed to save credit usage data")
                logger.error(f"Error saving credit usage data: {str(e)}")

    # Credit Score Improvement Tab
    with tabs[1]:
        st.header("📈 Credit Score Booster")
        col1, col2 = st.columns(2)
        with col1:
            current_score = st.slider(
                "Current Credit Score",
                300, 900, 650
            )

            # Score Analysis with animated celebration
            score_category = "Poor" if current_score < 550 else "Fair" if current_score < 650 else "Good" if current_score < 750 else "Excellent"
            st.metric(
                "Credit Score Status",
                current_score,
                score_category,
                help="Credit scores: Poor (<550), Fair (550-650), Good (650-750), Excellent (>750)"
            )

            if current_score >= 750:
                show_celebration_animation(current_score - 700)

        with col2:
            st.info("""
            ### 📊 Score Factors
            1. Payment History (35%)
            2. Credit Utilization (30%)
            3. Credit Age (15%)
            4. Credit Mix (10%)
            5. New Credit (10%)
            """)

        # Personalized Improvement Plan with Milestones
        st.subheader("🎯 Your Score Boost Plan")
        if current_score < 750:
            col1, col2 = st.columns(2)
            with col1:
                show_milestone_card(
                    "Short-Term Goals",
                    "Keep utilization below 30% and make timely payments",
                    "🎯"
                )
                show_milestone_card(
                    "Mid-Term Goals",
                    "Build credit mix and maintain low balances",
                    "⭐"
                )

            with col2:
                show_milestone_card(
                    "Timeline to 750+",
                    "3-6 months: Consistent payments\n6-12 months: Low utilization",
                    "📅"
                )
                show_milestone_card(
                    "Reward Milestones",
                    "Earn badges and cashback for good credit habits",
                    "🏆"
                )

            # Score Simulator with Animation
            st.subheader("📊 Score Improvement Simulator")
            months_consistent = st.slider("Months of Consistent Payments", 0, 24, 6)
            utilization_reduction = st.slider("Reduced Utilization to (%)", 0, 100, 30)

            potential_improvement = min(
                (months_consistent * 5) + ((70 - utilization_reduction) * 2),
                900 - current_score
            )

            if potential_improvement > 0:
                show_celebration_animation(potential_improvement)
                st.success(f"""
                ### 🎯 Your Potential Score in {months_consistent} months
                Starting Score: {current_score}
                Potential Improvement: +{potential_improvement} points
                Target Score: {min(current_score + potential_improvement, 900)}
                """)

        else:
            show_celebration_animation(50)
            st.success("""
            **🌟 Excellent Score Achievement! 🌟**
            ✅ Continue your good credit habits
            ✅ Monitor credit reports regularly
            ✅ Consider premium card upgrades
            """)
        show_credit_challenges()

    # Smart Spending Guide Tab
    with tabs[2]:
        st.header("🛍️ Smart Spending Guide")

        # Reward Categories Optimization
        reward_categories = {
            "Groceries & Daily Needs": ["5% cashback on grocery stores", "2x points at supermarkets", "Additional discounts with partner stores"],
            "Travel & Entertainment": ["4x points on travel bookings", "Free lounge access", "Movie ticket discounts"],
            "Online Shopping": ["Extra cashback on e-commerce", "Special festival offers", "Extended warranty protection"],
            "Fuel & Utilities": ["Fuel surcharge waiver", "Reward points on bill payments", "Auto-debit discounts"]
        }

        for category, benefits in reward_categories.items():
            with st.expander(f"💡 {category} Optimization"):
                for benefit in benefits:
                    st.write(f"• {benefit}")

        st.markdown("""
        <div style='background-color: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 10px; margin: 10px 0;'>
            <h4>🎯 Smart Timing Tips</h4>
            • Buy during card sale events<br>
            • Stack rewards with merchant offers<br>
            • Time large purchases with reward multipliers<br>
            • Monitor special promotions
        </div>
        """, unsafe_allow_html=True)

        # Weekly Smart Tips
        st.subheader("💡 This Week's Smart Tips")
        tips = [
            "Use your card's price protection feature for big purchases",
            "Convert large purchases to EMI before statement generation",
            "Check partner merchant offers before shopping",
            "Enable international transactions only when needed"
        ]
        for tip in tips:
            st.info(f"**Tip**: {tip}")

    # Minimum Payment Impact Tab
    with tabs[3]:
        st.header("💰 Minimum Payment Impact")
        st.write("Understand the impact of making only minimum payments on your credit card debt and credit score.")

        col1, col2 = st.columns(2)
        with col1:
            balance = st.number_input(
                "Credit Card Balance (₹)",
                min_value=1000,
                value=50000,
                step=1000,
                help="Enter your current credit card balance"
            )

        with col2:
            interest_rate = st.number_input(
                "Annual Interest Rate (%)",
                min_value=1.0,
                max_value=60.0,
                value=36.0,
                step=0.1,
                help="Enter your card's annual interest rate"
            )

        if st.button("Calculate Impact", use_container_width=True):
            show_minimum_payment_analysis(balance, interest_rate)

    # Combined Gamification & Benefits Tab
    with tabs[4]:
        st.header("🎮 Rewards & Benefits")

        # Show Gamification Section
        st.subheader("🏆 Credit Score Challenges")
        show_credit_challenges()

        # Show Benefits Section
        st.subheader("💎 Card Benefits")
        with st.expander("🔍 Hidden Card Benefits"):
            benefit_categories = {
                "Travel Protection": [
                    "Flight delay insurance up to ₹10,000",
                    "Lost baggage cover up to ₹50,000",
                    "Travel accident insurance"
                ],
                "Shopping Security": [
                    "Purchase protection against theft/damage",
                    "Extended warranty up to 1 year",
                    "Price protection for 90 days"
                ],
                "Lifestyle Perks": [
                    "Complimentary airport lounge access",
                    "Golf course privileges",
                    "Concierge services 24/7"
                ],
                "Financial Benefits": [
                    "Zero fuel surcharge",
                    "Interest-free period up to 50 days",
                    "EMI conversion facility"
                ]
            }

            for category, perks in benefit_categories.items():
                st.write(f"**{category}**")
                for perk in perks:
                    st.write(f"• {perk}")

        # Security Tips
        st.subheader("🔒 Security Tips")
        st.markdown("""
        <div style='background-color: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 10px; margin: 10px 0;'>
            <h4>🛡️ Stay Protected</h4>
            • Enable transaction alerts<br>
            • Use virtual cards for online shopping<br>
            • Enable international usage only when needed<br>
            • Monitor statements regularly
        </div>
        """, unsafe_allow_html=True)

if __name__ == "__main__":
    show()