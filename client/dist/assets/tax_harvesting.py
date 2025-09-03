import streamlit as st
import pandas as pd
import plotly.express as px
from utils.navigation import create_breadcrumb
from utils.data_persistence import FinancialDataManager

def show():
    # Initialize data manager
    data_manager = FinancialDataManager()

    # Initialize session state for data persistence
    if 'stcg_entries' not in st.session_state:
        st.session_state.stcg_entries = []
    if 'ltcg_entries' not in st.session_state:
        st.session_state.ltcg_entries = []
    if 'tax_reports' not in st.session_state:
        st.session_state.tax_reports = []

    # Add breadcrumb navigation
    create_breadcrumb(
        "Tax Harvesting",
        [{"name": "Tools", "link": "#"}]
    )

    st.title("💰 Tax Harvesting Calculator")

    st.write("""
    Optimize your tax savings by strategically managing your capital gains and losses. 
    Use this calculator to track and plan your tax harvesting strategy.
    """)

    st.warning("""
    **Important Disclaimer:** The tax calculations and projections shown are based on current tax laws 
    and historical data. Tax laws can change, and past performance does not guarantee future results. 
    This tool is for educational purposes only. Please consult with qualified tax advisors for 
    personalized tax advice and investment decisions.
    """)

    # Educational Section
    with st.expander("ℹ️ Understanding Tax Harvesting", expanded=True):
        st.markdown("""
        ### 📊 Tax Rates Summary
        | Asset Type | Short Term | Long Term | STCG Rate | LTCG Rate |
        |------------|------------|-----------|------------|------------|
        | Stocks/Equity Funds | < 1 year | > 1 year | 15% | 10% (>₹1L) |
        | Debt Funds | < 3 years | > 3 years | As per slab | 20% with indexation |
        | Gold/REITs | < 3 years | > 3 years | As per slab | 20% with indexation |

        ### Key Rules for Tax Loss Harvesting in India

        #### 1️⃣ 8-Year Carry Forward Rule
        - Losses can be carried forward for 8 assessment years
        - Must be declared in your ITR for the year of loss
        - Can be used against future capital gains
        - Short-term losses can offset both STCG and LTCG
        - Long-term losses can only offset LTCG

        #### 2️⃣ Important Deadlines
        - **March 31st, 2025**: Last date to book losses for FY 2024-25
        - **July 31st, 2025**: ITR filing deadline (to claim losses)
        - **30-day cooling period**: Required before repurchasing same security

        #### 3️⃣ Documentation Needed
        - Trade contract notes
        - Bank statements showing transactions
        - Previous years' ITR if carrying forward losses
        - Cost inflation index details for LTCG

        #### 4️⃣ Practical Examples

        **Example 1: Using Short-term Loss**
        ```
        Purchase: Infosys @ ₹1,500 × 100 shares = ₹1,50,000
        Sale: @ ₹1,300 × 100 shares = ₹1,30,000
        Loss: ₹20,000
        Tax Saved: ₹3,000 (at 15% STCG rate)
        ```

        **Example 2: Carrying Forward Loss**
        ```
        Year 1: Book loss of ₹50,000
        Year 2: Offset ₹30,000 against gains
        Year 3-8: Remaining ₹20,000 available
        ```
        """)

    # Connected Financial Features Section
    st.markdown("### 🔗 Connected Financial Features")
    st.write("""
    Your tax harvesting data is automatically integrated with these features to provide comprehensive financial insights:
    """)

    col1, col2, col3 = st.columns(3)

    with col1:
        st.info("""
        **👉 Portfolio Simulator**
        - Tax-efficient investment strategies
        - Risk-adjusted returns analysis
        - Portfolio rebalancing suggestions
        """)

    with col2:
        st.info("""
        **👉 Goal Settings**
        - Tax savings contribution to goals
        - Progress tracking with tax benefits
        - Goal-based investment suggestions
        """)

    with col3:
        st.info("""
        **👉 Financial Calculators**
        - After-tax returns calculation
        - Tax-adjusted investment planning
        - Future value projections
        """)

    # Main tax slab selection
    tax_bracket = st.selectbox(
        "Select Your Income Tax Slab",
        ["5%", "10%", "20%", "30%"],
        help="Your income tax bracket determines the tax rate for non-equity assets"
    )

    # Create tabs for STCG and LTCG
    stcg_tab, ltcg_tab = st.tabs(["📈 Short-Term Capital Gains", "📊 Long-Term Capital Gains"])

    with stcg_tab:
        st.header("Short-Term Capital Gains")

        # Investment Name
        investment_name = st.text_input(
            "Investment Name",
            key="stcg_investment_name",
            help="Enter a name to identify this investment (e.g., 'TCS Shares 2024' or 'HDFC Bank Q1')",
            placeholder="E.g., TCS Shares 2024"
        )

        # Investment Type Selection
        investment_type = st.selectbox(
            "Select Investment Type",
            [
                "Listed Stocks (Equity)",
                "Equity Mutual Funds & ETFs",
                "Index & Sectoral Funds",
                "Real Estate",
                "REITs",
                "Gold ETFs & SGBs",
            ],
            key="stcg_investment_type",
            help="""
            Eligible investments for tax harvesting:
            • Listed Stocks: Shares traded on recognized exchanges
            • Equity MFs & ETFs: Including ELSS funds
            • Index & Sectoral: Market index and sector-specific funds
            • Real Estate: Property investments
            • REITs: Real Estate Investment Trusts
            • Gold ETFs & SGBs: If sold before maturity
            """
        )

        # Add tax rate info based on investment type
        tax_info = {
            "Listed Stocks (Equity)": "15% STCG tax rate",
            "Equity Mutual Funds & ETFs": "15% STCG tax rate",
            "Index & Sectoral Funds": "15% STCG tax rate",
            "Real Estate": "As per income tax slab",
            "REITs": "As per income tax slab",
            "Gold ETFs & SGBs": "As per income tax slab"
        }

        st.info(f"💡 Tax Rate: {tax_info[investment_type]}")

        # Transaction Details
        col1, col2 = st.columns(2)
        with col1:
            purchase_price = st.number_input(
                "Purchase Price (₹)",
                min_value=0,
                value=100000,
                step=1000,
                key="stcg_purchase_price"
            )

        with col2:
            current_price = st.number_input(
                "Current Market Price (₹)",
                min_value=0,
                value=90000,
                step=1000,
                key="stcg_current_price"
            )

        # Calculate gain/loss
        difference = current_price - purchase_price
        if difference != 0:
            color = "green" if difference > 0 else "red"
            st.markdown(f"""
            <div style='padding: 10px; border-radius: 5px; background-color: {"rgba(0,255,0,0.1)" if difference > 0 else "rgba(255,0,0,0.1)"}'>
                <h3 style='color: {color}; margin: 0;'>
                    {"Gain" if difference > 0 else "Loss"}: ₹{abs(difference):,.2f}
                </h3>
            </div>
            """, unsafe_allow_html=True)

        # Save Entry Button
        if st.button("Save STCG Entry", key="save_stcg", disabled=not investment_name.strip(), type="primary"):
            entry = {
                "name": investment_name,
                "type": investment_type,
                "purchase_price": purchase_price,
                "current_price": current_price,
                "difference": difference,
                "date_added": pd.Timestamp.now().strftime("%Y-%m-%d %H:%M:%S")
            }
            st.session_state.stcg_entries.append(entry)
            st.success(f"✅ STCG entry '{investment_name}' saved successfully!")

        # Display saved entries
        if st.session_state.stcg_entries:
            st.markdown("#### 📋 Saved Short-term Entries")
            stcg_df = pd.DataFrame(st.session_state.stcg_entries)
            stcg_df['date_added'] = pd.to_datetime(stcg_df['date_added'])
            stcg_df = stcg_df.sort_values('date_added', ascending=False)

            st.dataframe(
                stcg_df[[
                    'name', 'type', 'purchase_price', 'current_price', 
                    'difference', 'date_added'
                ]].style.format({
                    'purchase_price': '₹{:,.2f}',
                    'current_price': '₹{:,.2f}',
                    'difference': '₹{:,.2f}',
                    'date_added': lambda x: x.strftime("%Y-%m-%d %H:%M")
                }),
                use_container_width=True
            )

    with ltcg_tab:
        st.header("Long-Term Capital Gains")

        # Investment Name
        investment_name = st.text_input(
            "Investment Name",
            key="ltcg_investment_name",
            help="Enter a name to identify this investment (e.g., 'Infosys 2023' or 'NIFTY Index Fund')",
            placeholder="E.g., Infosys 2023"
        )

        # Investment Type Selection
        investment_type = st.selectbox(
            "Select Investment Type",
            [
                "Listed Stocks (Equity)",
                "Equity Mutual Funds & ETFs",
                "Index & Sectoral Funds",
                "Real Estate",
                "REITs",
                "Gold ETFs & SGBs",
            ],
            key="ltcg_investment_type",
            help="""
            Eligible investments for tax harvesting:
            • Listed Stocks: Shares traded on recognized exchanges
            • Equity MFs & ETFs: Including ELSS funds
            • Index & Sectoral: Market index and sector-specific funds
            • Real Estate: Property investments
            • REITs: Real Estate Investment Trusts
            • Gold ETFs & SGBs: If sold before maturity
            """
        )

        # Add tax rate info based on investment type
        tax_info = {
            "Listed Stocks (Equity)": "10% LTCG tax rate (above ₹1 lakh)",
            "Equity Mutual Funds & ETFs": "10% LTCG tax rate (above ₹1 lakh)",
            "Index & Sectoral Funds": "10% LTCG tax rate (above ₹1 lakh)",
            "Real Estate": "As per income tax slab",
            "REITs": "As per income tax slab",
            "Gold ETFs & SGBs": "As per income tax slab"
        }

        st.info(f"💡 Tax Rate: {tax_info[investment_type]}")

        # Transaction Details
        col1, col2 = st.columns(2)
        with col1:
            purchase_price = st.number_input(
                "Purchase Price (₹)",
                min_value=0,
                value=100000,
                step=1000,
                key="ltcg_purchase_price"
            )

        with col2:
            current_price = st.number_input(
                "Current Market Price (₹)",
                min_value=0,
                value=90000,
                step=1000,
                key="ltcg_current_price"
            )

        # Calculate gain/loss
        difference = current_price - purchase_price
        if difference != 0:
            color = "green" if difference > 0 else "red"
            st.markdown(f"""
            <div style='padding: 10px; border-radius: 5px; background-color: {"rgba(0,255,0,0.1)" if difference > 0 else "rgba(255,0,0,0.1)"}'>
                <h3 style='color: {color}; margin: 0;'>
                    {"Gain" if difference > 0 else "Loss"}: ₹{abs(difference):,.2f}
                </h3>
            </div>
            """, unsafe_allow_html=True)

        # Save Entry Button
        if st.button("Save LTCG Entry", key="save_ltcg", disabled=not investment_name.strip(), type="primary"):
            entry = {
                "name": investment_name,
                "type": investment_type,
                "purchase_price": purchase_price,
                "current_price": current_price,
                "difference": difference,
                "date_added": pd.Timestamp.now().strftime("%Y-%m-%d %H:%M:%S")
            }
            st.session_state.ltcg_entries.append(entry)
            st.success(f"✅ LTCG entry '{investment_name}' saved successfully!")

        # Display saved entries
        if st.session_state.ltcg_entries:
            st.markdown("#### 📋 Saved Long-term Entries")
            ltcg_df = pd.DataFrame(st.session_state.ltcg_entries)
            ltcg_df['date_added'] = pd.to_datetime(ltcg_df['date_added'])
            ltcg_df = ltcg_df.sort_values('date_added', ascending=False)

            st.dataframe(
                ltcg_df[[
                    'name', 'type', 'purchase_price', 'current_price', 
                    'difference', 'date_added'
                ]].style.format({
                    'purchase_price': '₹{:,.2f}',
                    'current_price': '₹{:,.2f}',
                    'difference': '₹{:,.2f}',
                    'date_added': lambda x: x.strftime("%Y-%m-%d %H:%M")
                }),
                use_container_width=True
            )

    # Final Calculation Section
    st.header("🔢 Final Calculation & Tax Harvesting Strategy")

    if st.button("Calculate Tax Harvesting Strategy", type="primary"):
        # Calculate totals for STCG and LTCG
        stcg_entries = pd.DataFrame(st.session_state.stcg_entries)
        ltcg_entries = pd.DataFrame(st.session_state.ltcg_entries)

        # STCG Calculations
        stcg_gains = stcg_entries[stcg_entries['difference'] > 0]['difference'].sum() if not stcg_entries.empty else 0
        stcg_losses = abs(stcg_entries[stcg_entries['difference'] < 0]['difference'].sum()) if not stcg_entries.empty else 0
        net_stcg = stcg_gains - stcg_losses

        # LTCG Calculations
        ltcg_gains = ltcg_entries[ltcg_entries['difference'] > 0]['difference'].sum() if not ltcg_entries.empty else 0
        ltcg_losses = abs(ltcg_entries[ltcg_entries['difference'] < 0]['difference'].sum()) if not ltcg_entries.empty else 0
        net_ltcg = ltcg_gains - ltcg_losses

        st.markdown("### 📊 Summary of Gains & Losses")

        # Short-term Summary
        st.markdown("#### ✅ Short-Term (STCG & STCL) Summary:")
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Total ST Gains", f"₹{stcg_gains:,.2f}", delta="Taxable at 15%")
        with col2:
            st.metric("Total ST Losses", f"₹{stcg_losses:,.2f}", delta="Can offset both ST/LT")
        with col3:
            st.metric("Net ST Gain/Loss", f"₹{net_stcg:,.2f}", 
                     delta="Gain" if net_stcg > 0 else "Loss")

        # Long-term Summary
        st.markdown("#### ✅ Long-Term (LTCG & LTCL) Summary:")
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Total LT Gains", f"₹{ltcg_gains:,.2f}", delta="Taxable above ₹1L")
        with col2:
            st.metric("Total LT Losses", f"₹{ltcg_losses:,.2f}", delta="Can offset only LT")
        with col3:
            st.metric("Net LT Gain/Loss", f"₹{net_ltcg:,.2f}", 
                     delta="Gain" if net_ltcg > 0 else "Loss")

        # Tax Calculations
        st.markdown("### 💡 Tax Savings & Optimization Analysis")

        # Calculate taxes without optimization
        stcg_tax_before = max(0, stcg_gains) * 0.15
        ltcg_tax_before = max(0, ltcg_gains - 100000) * 0.10 if ltcg_gains > 100000 else 0
        total_tax_before = stcg_tax_before + ltcg_tax_before

        # Calculate optimized taxes
        remaining_stcg = max(0, net_stcg)
        remaining_ltcg = max(0, net_ltcg)
        stcg_tax_after = remaining_stcg * 0.15
        ltcg_tax_after = max(0, remaining_ltcg - 100000) * 0.10 if remaining_ltcg > 100000 else 0
        total_tax_after = stcg_tax_after + ltcg_tax_after
        tax_saved = total_tax_before - total_tax_after

        # Display tax calculations
        col1, col2 = st.columns(2)
        with col1:
            st.error(f"🔥 Total Tax Payable Without Optimization: ₹{total_tax_before:,.2f}")
        with col2:
            st.success(f"✅ Tax Saved After Harvesting: ₹{tax_saved:,.2f}")

        # Optimization Recommendations
        st.markdown("### 🚀 Actionable Tax Optimization Recommendations")

        st.info("""
        **Recommendation Notice:** The following suggestions are general guidelines based on 
        common tax-saving strategies. Your specific situation may require different approaches. 
        Always verify current tax laws and consult tax professionals before implementing any 
        tax-saving strategy.
        """)

        if net_stcg > 0:
            potential_st_saving = min(net_stcg, stcg_losses) * 0.15
            st.warning(f"""
            🔹 **Short-term Gains Optimization:**
            - Current STCG liability: ₹{stcg_tax_after:,.2f}
            - Consider booking losses before March 31st
            - Potential additional tax saving: ₹{potential_st_saving:,.2f}
            """)

        if net_ltcg > 100000:
            excess_ltcg = net_ltcg - 100000
            potential_lt_saving = excess_ltcg * 0.10
            st.warning(f"""
            🔹 **Long-term Gains Optimization:**
            - Taxable LTCG (above ₹1L): ₹{excess_ltcg:,.2f}
            - Consider spreading sales across financial years
            - Potential tax saving: ₹{potential_lt_saving:,.2f}
            """)

        if net_ltcg < 0:
            st.info(f"""
            🔹 **Loss Carry Forward Strategy:**
            - LT losses available: ₹{abs(net_ltcg):,.2f}
            - Can be carried forward for 8 years
            - Use to offset future LTCG
            """)

        # Final Tax Summary
        st.markdown("### 📌 Final Tax Position")
        col1, col2 = st.columns(2)
        with col1:
            st.metric(
                "🟢 Final Tax Payable",
                f"₹{total_tax_after:,.2f}",
                delta=f"-₹{tax_saved:,.2f}",
                delta_color="inverse"
            )

        # Save/Export Options
        st.markdown("### 💾 Save & Export Options")
        col1, col2 = st.columns(2)
        with col1:
            if st.button("Save Tax Report", type="primary"):
                report = {
                    'date': pd.Timestamp.now().strftime("%Y-%m-%d %H:%M"),
                    'stcg_gains': stcg_gains,
                    'stcg_losses': stcg_losses,
                    'ltcg_gains': ltcg_gains,
                    'ltcg_losses': ltcg_losses,
                    'tax_saved': tax_saved,
                    'final_tax': total_tax_after,
                    'stcg_entries': st.session_state.stcg_entries,
                    'ltcg_entries': st.session_state.ltcg_entries
                }

                try:
                    # Save to session state and persistent storage
                    st.session_state.tax_reports.append(report)
                    data_manager.save_tax_harvesting_data(report)
                    st.success("✅ Tax report saved successfully!")
                except Exception as e:
                    st.error(f"❌ Error saving report: {str(e)}")
                    return

                # Show integration success
                st.info("""
                💡 Your tax harvesting data has been integrated with:
                - Portfolio Simulator (for tax-efficient strategies)
                - Goal Settings (to track tax-saving targets)
                - Financial Calculators (for after-tax returns)
                """)

        with col2:
            if st.button("Download Tax Summary PDF"):
                st.info("💡 PDF download feature will be available soon!")

    # Show Historical Reports if available
    historical_data = data_manager.load_tax_harvesting_data()
    if historical_data:
        st.markdown("### 📊 Historical Tax Reports")

        st.info("""
        **Historical Data Notice:** The historical performance shown here reflects past tax 
        savings and strategies. Future tax savings opportunities may differ due to changes 
        in tax laws, market conditions, and individual circumstances.
        """)

        # Summary metrics
        col1, col2, col3 = st.columns(3)
        with col1:
            total_saved = sum(report.get('tax_saved', 0) for report in historical_data)
            st.metric("Total Tax Saved", f"₹{total_saved:,.2f}")
        with col2:
            st.metric("Reports Generated", len(historical_data))
        with col3:
            avg_saved = total_saved / len(historical_data) if historical_data else 0
            st.metric("Average Tax Saved", f"₹{avg_saved:,.2f}")

        # Create timeline visualization
        df = pd.DataFrame(historical_data)
        if not df.empty and 'date' in df.columns:
            df['date'] = pd.to_datetime(df['date'])
            fig = px.line(
                df,
                x='date',
                y='tax_saved',
                title='Tax Savings Over Time',
                labels={'tax_saved': 'Tax Saved (₹)', 'date': 'Date'}
            )
            st.plotly_chart(fig, use_container_width=True)


if __name__ == "__main__":
    show()