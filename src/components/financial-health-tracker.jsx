import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { SmileIcon, MehIcon, FrownIcon } from 'lucide-react'

const CircularProgress = ({ value, max, size = 200, strokeWidth = 15, color = "text-amber-500" }) => (
  <div className="relative" style={{ width: size, height: size }}>
    <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
      <circle
        className="text-amber-200"
        strokeWidth={strokeWidth}
        stroke="currentColor"
        fill="transparent"
        r={(size - strokeWidth) / 2}
        cx={size / 2}
        cy={size / 2} />
      <circle
        className={color}
        strokeWidth={strokeWidth}
        strokeDasharray={((size - strokeWidth) * Math.PI)}
        strokeDashoffset={((size - strokeWidth) * Math.PI) * (1 - value / max)}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r={(size - strokeWidth) / 2}
        cx={size / 2}
        cy={size / 2}
        transform={`rotate(-90 ${size / 2} ${size / 2})`} />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="text-3xl font-bold text-amber-800">{value}</span>
      <span className="text-sm text-amber-600">out of {max}</span>
    </div>
  </div>
)

export function FinancialHealthTrackerComponent() {
  const [financialData, setFinancialData] = useState({
    householdIncome: 50000,
    householdSpending: 40000,
    dependents: 2,
    dependentsInHighschool: false,
    hasCreditScore: true,
    creditScore: 700
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const calculateFinancialScore = () => {
    let score = 0
    const maxScore = 1000

    const incomeToSpendingRatio = financialData.householdIncome / financialData.householdSpending
    score += Math.min(incomeToSpendingRatio * 100, 300)

    const dependentScore = Math.max(200 - financialData.dependents * 50, 0)
    score += dependentScore

    if (financialData.dependentsInHighschool) {
      score -= 50
    }

    if (financialData.hasCreditScore && financialData.creditScore !== null) {
      score += (financialData.creditScore / 850) * 500
    }

    return Math.round(Math.min(Math.max(score, 0), maxScore));
  }

  const financialScore = calculateFinancialScore()

  const getFinancialMood = (score) => {
    if (score > 750) return <SmileIcon className="w-24 h-24 text-amber-500" />;
    if (score > 500) return <MehIcon className="w-24 h-24 text-amber-400" />;
    return <FrownIcon className="w-24 h-24 text-amber-300" />;
  }

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    setFinancialData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }))
  }

  const handleSwitchChange = (name) => (checked) => {
    setFinancialData(prev => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    (<div
      className="min-h-screen bg-gradient-to-br from-amber-100 to-red-200 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <AnimatePresence>
          {!isSubmitted && (
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}>
              <Card className="w-full bg-amber-50 border-amber-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-amber-800">Enter Your Financial Data</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="householdIncome" className="text-amber-700">Household Income</Label>
                      <Input
                        type="number"
                        id="householdIncome"
                        name="householdIncome"
                        value={financialData.householdIncome}
                        onChange={handleInputChange}
                        className="border-amber-300 focus:border-amber-500 focus:ring-amber-500" />
                    </div>
                    <div>
                      <Label htmlFor="householdSpending" className="text-amber-700">Household Spending</Label>
                      <Input
                        type="number"
                        id="householdSpending"
                        name="householdSpending"
                        value={financialData.householdSpending}
                        onChange={handleInputChange}
                        className="border-amber-300 focus:border-amber-500 focus:ring-amber-500" />
                    </div>
                    <div>
                      <Label htmlFor="dependents" className="text-amber-700"># of Dependents</Label>
                      <Input
                        type="number"
                        id="dependents"
                        name="dependents"
                        value={financialData.dependents}
                        onChange={handleInputChange}
                        className="border-amber-300 focus:border-amber-500 focus:ring-amber-500" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="dependentsInHighschool"
                        checked={financialData.dependentsInHighschool}
                        onCheckedChange={handleSwitchChange('dependentsInHighschool')}
                        className="bg-amber-300 data-[state=checked]:bg-amber-500" />
                      <Label htmlFor="dependentsInHighschool" className="text-amber-700">Any dependents in High school?</Label>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-amber-700">Do you have a credit score?</Label>
                      <RadioGroup
                        defaultValue={financialData.hasCreditScore ? 'yes' : 'no'}
                        onValueChange={(value) => {
                          setFinancialData(prev => ({
                            ...prev,
                            hasCreditScore: value === 'yes',
                            creditScore: value === 'no' ? null : prev.creditScore
                          }))
                        }}
                        className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="yes"
                            id="hasCreditScore-yes"
                            className="border-amber-500 text-amber-600" />
                          <Label htmlFor="hasCreditScore-yes" className="text-amber-700">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="no"
                            id="hasCreditScore-no"
                            className="border-amber-500 text-amber-600" />
                          <Label htmlFor="hasCreditScore-no" className="text-amber-700">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    {financialData.hasCreditScore && (
                      <div>
                        <Label htmlFor="creditScore" className="text-amber-700">Credit Score</Label>
                        <Input
                          type="number"
                          id="creditScore"
                          name="creditScore"
                          value={financialData.creditScore || ''}
                          onChange={handleInputChange}
                          className="border-amber-300 focus:border-amber-500 focus:ring-amber-500" />
                      </div>
                    )}
                    <Button
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white">Calculate Financial Health</Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isSubmitted && (
            <div className="flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex-1">
                <div
                  className="w-48 h-48 bg-amber-100 rounded-full flex items-center justify-center">
                  {getFinancialMood(financialScore)}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex-1">
                <Card className="w-full bg-amber-50 border-amber-200">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-center text-amber-800">Financial Health Score</h3>
                    <div className="flex justify-center mb-6">
                      <CircularProgress value={financialScore} max={1000} size={200} color="text-amber-500" />
                    </div>
                    <Button
                      className="mt-6 w-full bg-amber-500 hover:bg-amber-600 text-white"
                      onClick={() => setIsSubmitted(false)}>Update Data</Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>)
  );
}