import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";

export default function CreditCardUsage() {
  return (
    <div className="px-4 py-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => window.history.back()}
          className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
        >
          <span className="material-icons text-sm">arrow_back</span>
        </button>
        <h1 className="text-2xl font-bold">Smart Credit Card Use</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
            <CardTitle className="text-black dark:text-white">Credit Card Usage Overview</CardTitle>
            <CardDescription>Learn how to use credit cards effectively and avoid debt traps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Your Credit Utilization</h3>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">32% (₹16,000 of ₹50,000)</span>
                <span className="text-xs text-gray-500">Ideal: Below 30%</span>
              </div>
              <div className="relative">
                <Progress value={32} className="h-2 bg-gray-200" />
                <div className="absolute top-0 left-[30%] w-px h-2 bg-red-400"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Keep your credit utilization under 30% to maintain a good credit score.</p>
            </div>

            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-medium">Best Practices</h3>
              
              <div className="flex">
                <div className="mr-3 mt-1">
                  <span className="flex items-center justify-center rounded-full bg-green-100 w-8 h-8">
                    <span className="material-icons text-green-600 text-sm">check_circle</span>
                  </span>
                </div>
                <div>
                  <h4 className="font-medium">Pay in Full Each Month</h4>
                  <p className="text-sm text-gray-600">Avoid interest charges by paying your balance in full before the due date.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-3 mt-1">
                  <span className="flex items-center justify-center rounded-full bg-green-100 w-8 h-8">
                    <span className="material-icons text-green-600 text-sm">calendar_today</span>
                  </span>
                </div>
                <div>
                  <h4 className="font-medium">Set Up Automatic Payments</h4>
                  <p className="text-sm text-gray-600">Schedule automatic payments to avoid late fees and damaged credit.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-3 mt-1">
                  <span className="flex items-center justify-center rounded-full bg-green-100 w-8 h-8">
                    <span className="material-icons text-green-600 text-sm">credit_score</span>
                  </span>
                </div>
                <div>
                  <h4 className="font-medium">Use Rewards Strategically</h4>
                  <p className="text-sm text-gray-600">Choose cards with rewards that match your spending habits and redeem points wisely.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-3 mt-1">
                  <span className="flex items-center justify-center rounded-full bg-red-100 w-8 h-8">
                    <span className="material-icons text-red-600 text-sm">cancel</span>
                  </span>
                </div>
                <div>
                  <h4 className="font-medium">Avoid Cash Advances</h4>
                  <p className="text-sm text-gray-600">Cash advances usually come with high fees and interest rates with no grace period.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
            <CardTitle className="text-black dark:text-white">Your Cards</CardTitle>
            <CardDescription>Summary of your credit cards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-500 rounded-lg text-white">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-xs opacity-80">HDFC Bank</p>
                    <p className="font-medium">Regalia Credit Card</p>
                  </div>
                  <span className="material-icons text-xl">credit_card</span>
                </div>
                <p className="text-xs opacity-80 mb-1">Card Number</p>
                <p className="font-mono">•••• •••• •••• 7812</p>
                <div className="flex justify-between mt-4">
                  <div>
                    <p className="text-xs opacity-80">Valid Thru</p>
                    <p>05/26</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-80">Limit</p>
                    <p>₹1,50,000</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-700 rounded-lg text-white">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-xs opacity-80">SBI Card</p>
                    <p className="font-medium">SimplySAVE</p>
                  </div>
                  <span className="material-icons text-xl">credit_card</span>
                </div>
                <p className="text-xs opacity-80 mb-1">Card Number</p>
                <p className="font-mono">•••• •••• •••• 3245</p>
                <div className="flex justify-between mt-4">
                  <div>
                    <p className="text-xs opacity-80">Valid Thru</p>
                    <p>11/25</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-80">Limit</p>
                    <p>₹80,000</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
          <CardTitle className="text-black dark:text-white">Interest Calculator</CardTitle>
          <CardDescription>See how much interest you'll pay if you only make minimum payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Balance</h3>
              <p className="text-2xl font-semibold">₹50,000</p>
              <div className="mt-3 text-xs text-gray-500">Paying only minimum (₹1,500/month)</div>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Interest</h3>
              <p className="text-2xl font-semibold text-red-500">₹44,324</p>
              <div className="mt-3 text-xs text-gray-500">At 36% APR</div>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Time to Pay Off</h3>
              <p className="text-2xl font-semibold">76 months</p>
              <div className="mt-3 text-xs text-gray-500">Over 6 years</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex">
              <span className="material-icons text-amber-500 mr-2">warning</span>
              <div>
                <h4 className="font-medium">Minimum Payment Warning</h4>
                <p className="text-sm text-gray-600">If you make only the minimum payment each month, you will pay more in interest and it will take you longer to pay off your balance.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}