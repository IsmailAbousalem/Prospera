import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { SmileIcon, MehIcon, FrownIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'  // Replaced next/router with react-router-dom

// Utility function to store data in local storage
const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

// Utility function to retrieve data from local storage
const getFromLocalStorage = (key) => {
  const savedData = localStorage.getItem(key)
  return savedData ? JSON.parse(savedData) : null
}

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
    householdIncome: null,
    householdSpending: null,
    dependents: null,
    dependentsInHighschool: false,
    hasCreditScore: false,
    creditScore: null
  })


  const [isSubmitted, setIsSubmitted] = useState(false)
  const navigate = useNavigate()  // Use react-router-dom's navigate

  // Load saved data from local storage on component mount
  useEffect(() => {
    const savedData = getFromLocalStorage('financialData')
    if (savedData) {
      setFinancialData(savedData)
    }
  }, [])

  const calculateFinancialScore = () => {
    let score = 0
    const maxScore = 100

    const incomeToSpendingRatio = financialData.householdIncome / financialData.householdSpending
    score += Math.min(incomeToSpendingRatio * 10, 30)

    const dependentScore = Math.max(20 - financialData.dependents * 5, 0)
    score += dependentScore

    if (financialData.dependentsInHighschool) {
      score -= 50
    }

    if (financialData.hasCreditScore && financialData.creditScore !== null) {
      score += (financialData.creditScore / 850) * 50
    }

    return Math.round(Math.min(Math.max(score, 0), maxScore));
  }

  const financialScore = calculateFinancialScore()

  const getFinancialMood = (score) => {
    if (score >= 75) return <img src='/src/assets/happy1.png' alt="Happy Foxy" style={{ width: '350px', height: 'auto' }}/>;
    if (score >= 50) return <img src='/src/assets/sur1.png' alt="Surprise Foxy" style={{ width: '350px', height: 'auto' }}/>;
    if (score >= 25 ) return <img src='/src/assets/sick1.png' alt="Sick Foxy" style={{ width: '350px', height: 'auto' }}/>;
    return <img src='/src/assets/sad1.png' alt="Sad Foxy" style={{ width: '350px', height: 'auto' }}></img>;

  }

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    const updatedData = {
      ...financialData,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }
    setFinancialData(updatedData)
    
    // Save updated data to local storage
    saveToLocalStorage('financialData', updatedData)
  }

  const handleSwitchChange = (name) => (checked) => {
    const updatedData = { ...financialData, [name]: checked }
    setFinancialData(updatedData)
    
    // Save updated data to local storage
    saveToLocalStorage('financialData', updatedData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  // Function to navigate to chatbot with context
  const handleFoxyAdviceClick = () => {
    // Save the financial data to local storage and navigate to chatbot
    saveToLocalStorage('financialContext', financialData)
    navigate('/chatwithadvice')  // Navigate to chatbot route
  }

  return (
    (<div className="min-h-screen bg-gradient-to-br from-amber-200 to-red-200 flex items-center justify-center p-4">
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
                        value={financialData.householdIncome || ''}  // Use empty string if no value
                        onChange={handleInputChange}
                        className="border-amber-300 focus:border-amber-500 focus:ring-amber-500" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="householdSpending" className="text-amber-700">Household Spending</Label>
                      <Input
                        type="number"
                        id="householdSpending"
                        name="householdSpending"
                        value={financialData.householdSpending || ''}  // Use empty string if no value
                        onChange={handleInputChange}
                        className="border-amber-300 focus:border-amber-500 focus:ring-amber-500" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="dependents" className="text-amber-700"># of Dependents</Label>
                      <Input
                        type="number"
                        id="dependents"
                        name="dependents"
                        value={financialData.dependents || ''}  // Use empty string if no value
                        onChange={handleInputChange}
                        className="border-amber-300 focus:border-amber-500 focus:ring-amber-500" 
                      />
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
                          const updatedData = {
                            ...financialData,
                            hasCreditScore: value === 'yes',
                            creditScore: value === 'no' ? null : financialData.creditScore
                          }
                          setFinancialData(updatedData)

                          // Save updated data to local storage
                          saveToLocalStorage('financialData', updatedData)
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
                          value={financialData.creditScore || ''}  // Use empty string if no value
                          onChange={handleInputChange}
                          className="border-amber-300 focus:border-amber-500 focus:ring-amber-500" 
                        />
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
                <div>
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
                      <CircularProgress value={financialScore} max={100} size={200} color="text-amber-500" />
                    </div>
                    <Button
                      className="mt-6 w-full bg-amber-500 hover:bg-amber-600 text-white"
                      onClick={() => setIsSubmitted(false)}>
                      Update Data
                  </Button>
                    {/* Buttons to ask for advice or start regular chat */}
                    <Button
                      className="mt-6 w-full bg-amber-500 hover:bg-amber-600 text-white"
                      onClick={handleFoxyAdviceClick}>
                      Want Foxy's Advice?
                    </Button>
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
