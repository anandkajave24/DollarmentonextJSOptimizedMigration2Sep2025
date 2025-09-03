import React from "react";
import { Card, CardContent } from "../components/ui/card";

export default function InvestmentOptionsFixed() {
  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <span className="material-icons mr-2 text-amber-500">savings</span>
          Comprehensive Investment Options in India
        </h3>
        
        <div className="overflow-x-auto">
          <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
            <span className="text-blue-600 mr-2">⚪</span>
            Low-Risk Investment Options
            <span className="ml-2 text-sm font-normal text-gray-600">(Focus on capital preservation and guaranteed returns)</span>
          </h4>
          
          <table className="min-w-full rounded-lg overflow-hidden text-sm mb-6">
            <thead>
              <tr className="bg-blue-50 text-gray-700 font-medium">
                <th className="p-3 text-left">INVESTMENT TYPE</th>
                <th className="p-3 text-left">EXPECTED RETURN</th>
                <th className="p-3 text-left">RISK LEVEL</th>
                <th className="p-3 text-left">LIQUIDITY</th>
                <th className="p-3 text-left">IDEAL FOR</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium">Public Provident Fund (PPF)</td>
                <td className="p-3">~7.1%</td>
                <td className="p-3">
                  <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded-full">
                    Very Low
                  </span>
                </td>
                <td className="p-3">Low (15-year lock-in)</td>
                <td className="p-3">Long-term, tax-saving investors</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium">EPF / VPF</td>
                <td className="p-3">~8.15%</td>
                <td className="p-3">
                  <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded-full">
                    Very Low
                  </span>
                </td>
                <td className="p-3">Low</td>
                <td className="p-3">Salaried individuals</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium">Fixed Deposits</td>
                <td className="p-3">6% - 7.5%</td>
                <td className="p-3">
                  <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded-full">
                    Very Low
                  </span>
                </td>
                <td className="p-3">High (Premature penalty)</td>
                <td className="p-3">Elderly, capital preservation</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium">Recurring Deposits</td>
                <td className="p-3">5.5% - 7%</td>
                <td className="p-3">
                  <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded-full">
                    Very Low
                  </span>
                </td>
                <td className="p-3">Moderate</td>
                <td className="p-3">Small, regular savers</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium">Savings Account</td>
                <td className="p-3">2% - 4%</td>
                <td className="p-3">
                  <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded-full">
                    Very Low
                  </span>
                </td>
                <td className="p-3">Very High</td>
                <td className="p-3">Daily liquidity needs</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium">Post Office Saving Schemes</td>
                <td className="p-3">6.6% - 7.7%</td>
                <td className="p-3">
                  <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded-full">
                    Very Low
                  </span>
                </td>
                <td className="p-3">Low - Moderate</td>
                <td className="p-3">Conservative investors</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium">Sovereign Gold Bonds</td>
                <td className="p-3">7.5% + 2.5% interest</td>
                <td className="p-3">
                  <span className="bg-green-100 text-green-800 text-[10px] px-1.5 py-0.5 rounded-full">
                    Low
                  </span>
                </td>
                <td className="p-3">Low (5-8 year lock-in)</td>
                <td className="p-3">Gold investors with long-term horizon</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium">Government Bonds (G-Secs)</td>
                <td className="p-3">6% - 7.5%</td>
                <td className="p-3">
                  <span className="bg-green-100 text-green-800 text-[10px] px-1.5 py-0.5 rounded-full">
                    Low
                  </span>
                </td>
                <td className="p-3">Low - Moderate</td>
                <td className="p-3">Risk-averse long-term investors</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium">Treasury Bills</td>
                <td className="p-3">~5.5% - 6.5%</td>
                <td className="p-3">
                  <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded-full">
                    Very Low
                  </span>
                </td>
                <td className="p-3">Short-term (91 to 364 days)</td>
                <td className="p-3">Ultra-safe, short-term investors</td>
              </tr>
            </tbody>
          </table>
          
          <h4 className="font-semibold text-amber-800 mb-3 flex items-center">
            <span className="text-amber-600 mr-2">🟠</span>
            Moderate-Risk Investment Options
            <span className="ml-2 text-sm font-normal text-gray-600">(Balance between growth and safety)</span>
          </h4>
        </div>
      </CardContent>
    </Card>
  );
}