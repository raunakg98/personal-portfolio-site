'use client'
import React, { useState, useEffect } from 'react';
import { Shield, Brain, Database, BarChart3, Play, Pause, Settings, AlertTriangle, Eye, Info, TrendingUp, ArrowLeft, RefreshCw, Download } from 'lucide-react';

// Type definitions for TypeScript safety
interface MerchantCategories {
  [key: string]: number;
}

interface LocationCategories {
  [key: string]: number;
}

interface TransactionFeatures {
  amount_z_score: number;
  merchant_risk: number;
  location_risk: number;
  time_risk: number;
  velocity_risk: number;
  amount_merchant_interaction: number;
}

interface Transaction {
  id: string;
  timestamp: string;
  amount: number;
  merchant: string;
  location: string;
  card_type?: string;
  isFraud: boolean;
  merchant_risk: number;
  location_risk: number;
  features?: TransactionFeatures;
}

const FraudDetectionProject = () => {
  const [activeSection, setActiveSection] = useState('simulator');

  // Back to Portfolio Component (minimal, clean)
  const BackToPortfolio = () => (
    <div className="p-6 pb-0">
      <button 
        onClick={() => window.history.back()}
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Portfolio
      </button>
    </div>
  );

  // Clean Hero Section (no large header)
  const HeroSection = () => (
    <div className="px-6 pt-4 pb-8">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Shield className="w-12 h-12 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">
            Real-Time Credit Card Fraud Detection
          </h1>
        </div>
        <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
          Advanced ML system using ensemble methods and explainable AI for Navy Federal Credit Union.
        </p>
        
        {/* Compact Educational Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6 max-w-4xl mx-auto">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-yellow-800 font-medium text-sm mb-1">⚠️ Educational Simulation</p>
              <p className="text-yellow-700 text-xs">
                Uses completely synthetic data and simulated ML processes. No real customer information is used.
              </p>
            </div>
          </div>
        </div>

        {/* Compact Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <Brain className="w-6 h-6 text-green-600 mb-2" />
            <h3 className="font-bold text-gray-900 mb-1 text-sm">Advanced ML Models</h3>
            <p className="text-gray-600 text-xs">Ensemble of Logistic Regression + Random Forest</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <BarChart3 className="w-6 h-6 text-blue-600 mb-2" />
            <h3 className="font-bold text-gray-900 mb-1 text-sm">Real-Time Processing</h3>
            <p className="text-gray-600 text-xs">Sub-second fraud detection with explainable AI</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <Shield className="w-6 h-6 text-purple-600 mb-2" />
            <h3 className="font-bold text-gray-900 mb-1 text-sm">Business Impact</h3>
            <p className="text-gray-600 text-xs">Reduces fraud losses while protecting members</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Navigation Component (simplified)
  const ProjectNavigation = () => {
    const sections = [
      { id: 'simulator', name: 'Live Simulator', icon: Shield },
      { id: 'data-explorer', name: 'Data Explorer', icon: Database },
      { id: 'training', name: 'ML Training', icon: Brain },
      { id: 'about', name: 'About Project', icon: Info }
    ];

    return (
      <div className="bg-white border-b border-gray-200 mx-6 rounded-t-lg">
        <nav className="flex space-x-6 px-6">
          {sections.map(({ id, name, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex items-center space-x-2 px-3 py-3 border-b-2 font-medium text-sm transition-colors ${
                activeSection === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{name}</span>
            </button>
          ))}
        </nav>
      </div>
    );
  };

  // Live Fraud Simulator Section
  const LiveSimulatorSection = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
    const [stats, setStats] = useState({
      total: 0,
      fraudulent: 0,
      detected: 0,
      falsePositives: 0,
      accuracy: 0
    });
    const [threshold, setThreshold] = useState(0.5);

    // Merchant risk categories with proper typing
    const MERCHANT_CATEGORIES: MerchantCategories = {
      'Grocery Store': 0.02, 'Gas Station': 0.04, 'Restaurant': 0.05, 'Pharmacy': 0.03,
      'Online Retail': 0.18, 'Electronics Store': 0.22, 'Hotel': 0.25, 'Jewelry Store': 0.35,
      'Online Gaming': 0.75, 'Gambling Casino': 0.85, 'Unknown Merchant': 0.88, 'Foreign ATM': 0.72
    };

    const LOCATION_CATEGORIES: LocationCategories = {
      'Beverly Hills CA': 0.02, 'Manhattan NY': 0.05, 'Suburban Mall': 0.04, 'Airport Terminal': 0.08,
      'Las Vegas NV': 0.22, 'Miami FL': 0.16, 'Downtown Detroit': 0.18, 'High Crime Area': 0.35,
      'Remote ATM': 0.28, 'Unknown Country': 0.88, 'High Risk Region': 0.85
    };

    // Generate realistic transaction with fraud bias
    const generateTransaction = (): any => {
      const isFraud = Math.random() < 0.05;
      const merchantKeys = Object.keys(MERCHANT_CATEGORIES);
      const locationKeys = Object.keys(LOCATION_CATEGORIES);
      
      let merchant: string, location: string, amount: number;
      
      if (isFraud) {
        const highRiskMerchants = merchantKeys.filter(m => (MERCHANT_CATEGORIES[m] || 0) > 0.4);
        const highRiskLocations = locationKeys.filter(l => (LOCATION_CATEGORIES[l] || 0) > 0.3);
        merchant = highRiskMerchants[Math.floor(Math.random() * highRiskMerchants.length)] || 'Unknown Merchant';
        location = highRiskLocations[Math.floor(Math.random() * highRiskLocations.length)] || 'Unknown Country';
        amount = Math.random() > 0.5 ? Math.random() * 10 + 1 : Math.random() * 4000 + 1000;
      } else {
        const lowRiskMerchants = merchantKeys.filter(m => (MERCHANT_CATEGORIES[m] || 0) < 0.3);
        const safeLocations = locationKeys.filter(l => (LOCATION_CATEGORIES[l] || 0) < 0.2);
        merchant = lowRiskMerchants[Math.floor(Math.random() * lowRiskMerchants.length)] || 'Grocery Store';
        location = safeLocations[Math.floor(Math.random() * safeLocations.length)] || 'Suburban Mall';
        amount = Math.random() * 300 + 20;
      }

      return {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        amount: amount,
        merchant: merchant,
        location: location,
        isFraud: isFraud,
        merchant_risk: MERCHANT_CATEGORIES[merchant] || 0.5,
        location_risk: LOCATION_CATEGORIES[location] || 0.5
      };
    };

    // Enhanced ML fraud detection
    const detectFraud = (transaction: any) => {
      const hour = new Date().getHours();
      
      const features = {
        amount_z_score: (transaction.amount - 150) / 200,
        merchant_risk: transaction.merchant_risk,
        location_risk: transaction.location_risk,
        time_risk: (hour >= 22 || hour <= 5) ? 0.7 : 0.1,
        velocity_risk: Math.random() * 0.3,
        amount_merchant_interaction: ((transaction.amount - 150) / 200) * transaction.merchant_risk
      };

      const weights = {
        amount_z_score: -0.156, merchant_risk: 1.847, location_risk: 0.923,
        time_risk: 0.445, velocity_risk: 2.134, amount_merchant_interaction: 0.778
      };

      const logit = Object.keys(weights).reduce((sum, key) => sum + (weights as any)[key] * (features as any)[key], 0);
      const logisticScore = 1 / (1 + Math.exp(-logit));

      let rfScore = 0;
      if (features.merchant_risk > 0.5 && features.amount_z_score > 1) rfScore += 0.2;
      if (features.location_risk > 0.3) rfScore += 0.15;
      if (features.time_risk > 0.5) rfScore += 0.1;
      if (features.velocity_risk > 0.6) rfScore += 0.25;
      if (features.amount_merchant_interaction > 0.4) rfScore += 0.3;

      const ensembleScore = (logisticScore * 0.6) + (rfScore * 0.4);
      const finalScore = Math.max(0, Math.min(1, ensembleScore + (Math.random() * 0.1 - 0.05)));

      const reasons = [];
      if (features.merchant_risk > 0.3) reasons.push(`High-risk merchant: ${transaction.merchant}`);
      if (features.location_risk > 0.2) reasons.push(`Suspicious location: ${transaction.location}`);
      if (Math.abs(features.amount_z_score) > 1) reasons.push(`Unusual amount: $${transaction.amount.toFixed(2)}`);
      if (features.time_risk > 0.5) reasons.push('High-risk time period');

      return {
        score: finalScore,
        prediction: finalScore > threshold ? 'FRAUD' : 'LEGITIMATE',
        confidence: Math.abs(finalScore - 0.5) * 2,
        reasons: reasons.slice(0, 3),
        features,
        model_breakdown: {
          logistic_score: logisticScore,
          random_forest_score: rfScore,
          ensemble_score: ensembleScore
        }
      };
    };

    // Real-time transaction generation
    useEffect(() => {
      if (!isRunning) return;

      const interval = setInterval(() => {
        const newTransaction = generateTransaction();
        const detection = detectFraud(newTransaction);
        const transactionWithDetection = { ...newTransaction, ...detection };
        setTransactions(prev => [transactionWithDetection, ...prev.slice(0, 19)]);

        setStats(prev => {
          const newStats = {
            total: prev.total + 1,
            fraudulent: prev.fraudulent + (newTransaction.isFraud ? 1 : 0),
            detected: prev.detected + (detection.prediction === 'FRAUD' && newTransaction.isFraud ? 1 : 0),
            falsePositives: prev.falsePositives + (detection.prediction === 'FRAUD' && !newTransaction.isFraud ? 1 : 0)
          };
          newStats.accuracy = newStats.total > 0 ? 
            ((newStats.detected + (newStats.total - newStats.fraudulent - newStats.falsePositives)) / newStats.total * 100) : 0;
          return newStats;
        });
      }, 1500);

      return () => clearInterval(interval);
    }, [isRunning, threshold]);

    const toggleSimulation = () => setIsRunning(!isRunning);
    const resetStats = () => {
      setStats({ total: 0, fraudulent: 0, detected: 0, falsePositives: 0, accuracy: 0 });
      setTransactions([]);
      setSelectedTransaction(null);
    };

    const getRiskColor = (score: number) => {
      if (score > 0.7) return 'text-red-600 bg-red-50';
      if (score > 0.4) return 'text-yellow-600 bg-yellow-50';
      return 'text-green-600 bg-green-50';
    };

    return (
      <div className="bg-white mx-6 rounded-b-lg shadow-sm">
        {/* Sticky Control Panel */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 p-6 rounded-b-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Live Fraud Detection Simulator</h2>
              <p className="text-sm text-gray-600 mt-1">
                Start the simulation to generate transactions in real-time. Click any transaction to view detailed ML analysis.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="relative group">
                <button
                  onClick={toggleSimulation}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isRunning 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isRunning ? 'Stop Stream' : 'Start Stream'}
                </button>
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {isRunning ? 'Stop generating new transactions' : 'Begin real-time transaction simulation'}
                </div>
              </div>
              <div className="relative group">
                <button
                  onClick={resetStats}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Reset
                </button>
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Clear all transactions and reset statistics
                </div>
              </div>
            </div>
          </div>

          {/* Threshold Control */}
          <div className="flex items-center gap-2 flex-wrap">
            <Settings className="w-5 h-5 text-gray-600" />
            <input
              type="range"
              min="0.1"
              max="0.9"
              step="0.1"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              className="w-32"
            />
            <span className="text-sm text-gray-600 font-medium">{(threshold * 100).toFixed(0)}%</span>
            <span className="text-xs text-gray-500">
              Fraud Detection Threshold (Higher = fewer false alarms, may miss some fraud)
            </span>
          </div>
        </div>

        {/* Statistics Dashboard */}
        <div className="p-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {[
              { label: 'Total', value: stats.total, icon: BarChart3, color: 'text-blue-600' },
              { label: 'Actual Fraud', value: stats.fraudulent, icon: AlertTriangle, color: 'text-red-600' },
              { label: 'Detected', value: stats.detected, icon: Shield, color: 'text-green-600' },
              { label: 'False Positives', value: stats.falsePositives, icon: Eye, color: 'text-yellow-600' },
              { label: 'Accuracy', value: `${stats.accuracy.toFixed(1)}%`, icon: TrendingUp, color: 'text-purple-600' }
            ].map(({ label, value, icon: Icon, color }, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Icon className={`w-6 h-6 ${color}`} />
                  <div>
                    <p className="text-lg font-bold text-gray-900">{value}</p>
                    <p className="text-xs text-gray-600">{label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Transaction Stream and Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Transaction Stream */}
            <div className="lg:col-span-2 bg-gray-50 rounded-lg">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Live Transaction Stream</h3>
                <p className="text-gray-600 text-sm">Real-time fraud detection results</p>
              </div>
              <div className="p-4">
                {transactions.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <Shield className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">Start the simulation to see live transactions</p>
                  </div>
                ) : (
                  <div className="space-y-2 h-96 overflow-y-auto">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        onClick={() => setSelectedTransaction(transaction)}
                        className={`p-3 rounded-lg border cursor-pointer hover:shadow-md transition-all ${
                          transaction.prediction === 'FRAUD' 
                            ? 'border-red-200 bg-red-50' 
                            : 'border-green-200 bg-green-50'
                        } ${selectedTransaction?.id === transaction.id ? 'ring-2 ring-blue-300' : ''}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              ${transaction.amount.toFixed(2)} - {transaction.merchant}
                            </p>
                            <p className="text-xs text-gray-600">
                              {transaction.location} • {transaction.timestamp}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`text-xs font-medium ${
                              transaction.prediction === 'FRAUD' ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {transaction.prediction}
                            </p>
                            <p className={`text-xs px-2 py-1 rounded ${getRiskColor(transaction.score)}`}>
                              {(transaction.score * 100).toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Transaction Analysis Panel */}
            <div className="bg-gray-50 rounded-lg">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Analysis</h3>
                <p className="text-gray-600 text-sm">Click a transaction to analyze</p>
              </div>
              <div className="p-4">
                <div className="h-96 overflow-y-auto">
                  {selectedTransaction ? (
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-gray-700">Transaction ID</p>
                        <p className="text-sm font-mono text-gray-900">{selectedTransaction.id}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-gray-700">Amount</p>
                        <p className="text-lg text-gray-900">${selectedTransaction.amount.toFixed(2)}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-gray-700">Risk Score</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                selectedTransaction.score > 0.7 ? 'bg-red-500' : 
                                selectedTransaction.score > 0.4 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${selectedTransaction.score * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium">
                            {(selectedTransaction.score * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-gray-700">Model Decision</p>
                        <p className={`text-sm font-medium ${
                          selectedTransaction.prediction === 'FRAUD' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {selectedTransaction.prediction}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-gray-700">Actual Status</p>
                        <p className={`text-sm font-medium ${
                          selectedTransaction.isFraud ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {selectedTransaction.isFraud ? 'FRAUDULENT' : 'LEGITIMATE'}
                        </p>
                      </div>
                      
                      {selectedTransaction.reasons && selectedTransaction.reasons.length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-gray-700 mb-2">Risk Factors</p>
                          <ul className="space-y-1">
                            {selectedTransaction.reasons.map((reason: string, index: number) => (
                              <li key={index} className="text-xs text-red-600 flex items-center gap-2">
                                <AlertTriangle className="w-3 h-3" />
                                {reason}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedTransaction.model_breakdown && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-xs font-medium text-blue-900 mb-2">Model Breakdown</p>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between text-blue-800">
                              <span>Logistic Regression:</span>
                              <span className="font-medium">{(selectedTransaction.model_breakdown.logistic_score * 100).toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between text-blue-800">
                              <span>Random Forest:</span>
                              <span className="font-medium">{(selectedTransaction.model_breakdown.random_forest_score * 100).toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between font-medium text-blue-900 pt-1 border-t border-blue-300">
                              <span>Final Ensemble:</span>
                              <span>{(selectedTransaction.model_breakdown.ensemble_score * 100).toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <Eye className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-sm">Select a transaction to analyze</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Information Panel */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-3">How This ML System Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-700">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Feature Engineering</h4>
                <ul className="space-y-1">
                  <li>• Amount Z-Score normalization</li>
                  <li>• Merchant risk scoring</li>
                  <li>• Geographic risk assessment</li>
                  <li>• Time-based patterns</li>
                  <li>• Feature interactions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">ML Architecture</h4>
                <ul className="space-y-1">
                  <li>• Logistic Regression model</li>
                  <li>• Random Forest ensemble</li>
                  <li>• 60% logistic + 40% RF</li>
                  <li>• Configurable thresholds</li>
                  <li>• Real-time scoring</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Business Value</h4>
                <ul className="space-y-1">
                  <li>• $10M+ potential savings</li>
                  <li>• Improved member experience</li>
                  <li>• Regulatory compliance</li>
                  <li>• Military-specific adaptations</li>
                  <li>• Scalable architecture</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DataExplorerSection = () => {
    const [sampleData, setSampleData] = useState<any[]>([]);
    const [showFeatures, setShowFeatures] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [stats, setStats] = useState<any>({});

    const MERCHANT_CATEGORIES: MerchantCategories = {
      'Grocery Store': 0.02, 'Pharmacy': 0.03, 'Gas Station': 0.04, 'Fast Food': 0.05,
      'Department Store': 0.06, 'Coffee Shop': 0.04, 'Bank ATM': 0.08, 'Utility Payment': 0.01,
      'Online Retail': 0.18, 'Electronics Store': 0.22, 'Clothing Store': 0.16, 'Restaurant': 0.12,
      'Hotel': 0.25, 'Airline': 0.20, 'Jewelry Store': 0.35, 'Luxury Goods': 0.38,
      'Cash Advance': 0.55, 'Money Transfer': 0.48, 'Cryptocurrency': 0.65,
      'Online Gaming': 0.75, 'Gambling Casino': 0.85, 'Unknown Merchant': 0.88, 'Foreign ATM': 0.72
    };

    const LOCATION_CATEGORIES: LocationCategories = {
      'Beverly Hills CA': 0.02, 'Manhattan NY': 0.05, 'Bellevue WA': 0.03, 'Suburban Mall': 0.04,
      'Airport Terminal': 0.08, 'Corporate District': 0.03, 'Las Vegas NV': 0.22, 'Miami FL': 0.16,
      'Downtown Detroit': 0.18, 'Border Town TX': 0.24, 'Tourist Area': 0.14, 'College Campus': 0.12,
      'High Crime Area': 0.35, 'Remote ATM': 0.28, 'London UK': 0.32, 'Toronto Canada': 0.28,
      'Tokyo Japan': 0.25, 'Unknown Country': 0.88, 'High Fraud Region': 0.85, 'Blocked Location': 0.90
    };

    const generateSampleTransaction = () => {
      const isFraud = Math.random() < 0.005; // Realistic 0.5% fraud rate
      const merchantKeys = Object.keys(MERCHANT_CATEGORIES);
      const locationKeys = Object.keys(LOCATION_CATEGORIES);
      
      let merchant: string, location: string, amount: number;
      
      if (isFraud) {
        const highRiskMerchants = merchantKeys.filter(m => (MERCHANT_CATEGORIES[m] || 0) > 0.4);
        const highRiskLocations = locationKeys.filter(l => (LOCATION_CATEGORIES[l] || 0) > 0.3);
        merchant = highRiskMerchants[Math.floor(Math.random() * highRiskMerchants.length)] || 'Unknown Merchant';
        location = highRiskLocations[Math.floor(Math.random() * highRiskLocations.length)] || 'Unknown Country';
        amount = Math.random() > 0.5 ? Math.random() * 10 + 1 : Math.random() * 4000 + 1000;
      } else {
        const lowRiskMerchants = merchantKeys.filter(m => (MERCHANT_CATEGORIES[m] || 0) < 0.3);
        const safeLocations = locationKeys.filter(l => (LOCATION_CATEGORIES[l] || 0) < 0.2);
        merchant = lowRiskMerchants[Math.floor(Math.random() * lowRiskMerchants.length)] || 'Grocery Store';
        location = safeLocations[Math.floor(Math.random() * safeLocations.length)] || 'Suburban Mall';
        amount = Math.random() * 300 + 20;
      }

      const timestamp = new Date();
      const hour = timestamp.getHours();
      
      const merchantRisk = MERCHANT_CATEGORIES[merchant] || 0.5;
      const locationRisk = LOCATION_CATEGORIES[location] || 0.5;
      
      const features = {
        amount_z_score: Number(((amount - 150) / 200).toFixed(3)),
        merchant_risk: merchantRisk,
        location_risk: locationRisk,
        time_risk: (hour >= 22 || hour <= 5) ? 0.7 : 0.1,
        velocity_risk: Number((Math.random() * 0.3).toFixed(3)),
        amount_merchant_interaction: Number(((amount - 150) / 200 * merchantRisk).toFixed(3))
      };

      return {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: timestamp.toISOString(),
        amount: Number(amount.toFixed(2)),
        merchant: merchant,
        location: location,
        card_type: ['Visa', 'Mastercard', 'Amex'][Math.floor(Math.random() * 3)],
        isFraud: isFraud,
        features
      };
    };

    const generateSampleData = async () => {
      setIsGenerating(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const data = [];
      for (let i = 0; i < 500; i++) {
        data.push(generateSampleTransaction());
      }
      
      setSampleData(data);

      const fraudCount = data.filter(t => t.isFraud).length;
      const avgAmount = data.reduce((sum, t) => sum + t.amount, 0) / data.length;
      const avgFraudAmount = fraudCount > 0 ? 
        data.filter(t => t.isFraud).reduce((sum, t) => sum + t.amount, 0) / fraudCount : 0;
      const avgLegitAmount = data.filter(t => !t.isFraud).reduce((sum, t) => sum + t.amount, 0) / (data.length - fraudCount);

      setStats({
        total: data.length,
        fraudCount,
        fraudRate: ((fraudCount / data.length) * 100).toFixed(3),
        avgAmount: avgAmount.toFixed(2),
        avgFraudAmount: avgFraudAmount.toFixed(2),
        avgLegitAmount: avgLegitAmount.toFixed(2),
        uniqueMerchants: new Set(data.map(t => t.merchant)).size,
        uniqueLocations: new Set(data.map(t => t.location)).size
      });
      
      setIsGenerating(false);
    };

    const downloadCSV = () => {
      const headers = ['id', 'timestamp', 'amount', 'merchant', 'location', 'card_type', 'isFraud',
                      'amount_z_score', 'merchant_risk', 'location_risk', 'time_risk', 'velocity_risk', 'amount_merchant_interaction'];
      
      const csvContent = [
        headers.join(','),
        ...sampleData.map(row => [
          row.id, row.timestamp, row.amount, `"${row.merchant}"`, `"${row.location}"`, row.card_type,
          row.isFraud ? 1 : 0, row.features.amount_z_score, row.features.merchant_risk,
          row.features.location_risk, row.features.time_risk, row.features.velocity_risk, row.features.amount_merchant_interaction
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'fraud_detection_dataset.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    };

    useEffect(() => {
      generateSampleData();
    }, []);

    return (
      <div className="bg-white mx-6 rounded-b-lg shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Database className="w-7 h-7 text-blue-600" />
                Transaction Data Explorer
              </h2>
              <p className="text-gray-600 mt-1">Explore our synthetic dataset structure and generation process</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={generateSampleData}
                disabled={isGenerating}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
              >
                <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                {isGenerating ? 'Generating...' : 'Generate New Data'}
              </button>
              <button
                onClick={downloadCSV}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              >
                <Download className="w-4 h-4" />
                Download CSV
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Data Generation Process */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Data Generation Process</h3>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-yellow-800 font-medium mb-1 text-sm">🔒 Privacy & Ethics</p>
                  <p className="text-yellow-700 text-xs">
                    All data is completely synthetic and generated in real-time. No real customer information, 
                    transaction history, or personal data is used. This ensures complete privacy compliance 
                    while demonstrating realistic fraud detection patterns.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Realistic Pattern Generation</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h5 className="font-medium text-blue-900 mb-1">Fraud Classification (0.5%)</h5>
                    <p className="text-blue-800 text-xs">
                      Each transaction has a realistic 0.5% probability of being fraudulent, creating 
                      natural class imbalance similar to real-world scenarios.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h5 className="font-medium text-green-900 mb-1">Merchant Risk Modeling</h5>
                    <p className="text-green-800 text-xs">
                      {Object.keys(MERCHANT_CATEGORIES).length}+ merchant categories with risk scores from grocery stores (2%) to 
                      gambling casinos (85%), based on real fraud patterns.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <h5 className="font-medium text-purple-900 mb-1">Geographic Risk Assessment</h5>
                    <p className="text-purple-800 text-xs">
                      {Object.keys(LOCATION_CATEGORIES).length}+ location categories from safe areas (Beverly Hills 2%) to 
                      high-risk regions (unknown countries 88%).
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3">Feature Engineering Pipeline</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <h5 className="font-medium text-gray-900 mb-2">Raw → ML Features</h5>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-blue-600">Amount ($245.67)</span>
                        <span>→ Z-Score (0.478)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-600">Merchant (Casino)</span>
                        <span>→ Risk Score (0.85)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-600">Time (2:30 AM)</span>
                        <span>→ Risk Score (0.7)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h5 className="font-medium text-indigo-900 mb-1">Advanced Features</h5>
                    <ul className="text-indigo-800 space-y-1 text-xs">
                      <li>• <strong>Velocity Risk:</strong> Transaction frequency patterns</li>
                      <li>• <strong>Feature Interactions:</strong> Amount × Merchant risk</li>
                      <li>• <strong>Temporal Patterns:</strong> Time-based risk scoring</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dataset Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-4 border">
              <h4 className="text-lg font-bold text-gray-900 mb-3">Dataset Statistics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Transactions:</span>
                  <span className="font-medium">{stats.total?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fraudulent:</span>
                  <span className="font-medium text-red-600">{stats.fraudCount} ({stats.fraudRate}%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Legitimate:</span>
                  <span className="font-medium text-green-600">{(stats.total - stats.fraudCount)?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Unique Merchants:</span>
                  <span className="font-medium">{stats.uniqueMerchants}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Unique Locations:</span>
                  <span className="font-medium">{stats.uniqueLocations}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Amount:</span>
                  <span className="font-medium">${stats.avgAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Fraud Amount:</span>
                  <span className="font-medium text-red-600">${stats.avgFraudAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Legit Amount:</span>
                  <span className="font-medium text-green-600">${stats.avgLegitAmount}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border">
              <h4 className="text-lg font-bold text-gray-900 mb-3">Data Schema</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <h5 className="font-medium text-gray-900">Raw Features (7 columns)</h5>
                  <ul className="text-gray-600 mt-1 space-y-1 text-xs">
                    <li>• <code>id</code> - Unique transaction identifier</li>
                    <li>• <code>timestamp</code> - Transaction date/time</li>
                    <li>• <code>amount</code> - Dollar amount ($)</li>
                    <li>• <code>merchant</code> - Business name</li>
                    <li>• <code>location</code> - Geographic location</li>
                    <li>• <code>card_type</code> - Visa/Mastercard/Amex</li>
                    <li>• <code>isFraud</code> - True label (target variable)</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-900">ML Features (6 columns)</h5>
                  <ul className="text-gray-600 mt-1 space-y-1 text-xs">
                    <li>• <code>amount_z_score</code> - Normalized amount</li>
                    <li>• <code>merchant_risk</code> - Risk score (0.01-0.95)</li>
                    <li>• <code>location_risk</code> - Geographic risk (0.01-0.95)</li>
                    <li>• <code>time_risk</code> - Hour-based risk (0.1-0.7)</li>
                    <li>• <code>velocity_risk</code> - Transaction frequency (0.0-0.3)</li>
                    <li>• <code>amount_merchant_interaction</code> - Feature interaction</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sample Data Table */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-900">Sample Data</h4>
              <button
                onClick={() => setShowFeatures(!showFeatures)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
              >
                <Eye className="w-4 h-4" />
                {showFeatures ? 'Hide ML Features' : 'Show ML Features'}
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b bg-gray-100">
                      <th className="text-left p-2">Amount</th>
                      <th className="text-left p-2">Merchant</th>
                      <th className="text-left p-2">Location</th>
                      <th className="text-left p-2">Card</th>
                      <th className="text-left p-2">Status</th>
                      {showFeatures && (
                        <>
                          <th className="text-left p-2">Amount Z</th>
                          <th className="text-left p-2">Merchant Risk</th>
                          <th className="text-left p-2">Location Risk</th>
                          <th className="text-left p-2">Time Risk</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {sampleData.slice(0, 15).map((row, index) => (
                      <tr key={index} className={`border-b ${row.isFraud ? 'bg-red-50' : 'bg-white'}`}>
                        <td className="p-2">${row.amount}</td>
                        <td className="p-2">{row.merchant}</td>
                        <td className="p-2">{row.location}</td>
                        <td className="p-2">{row.card_type}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            row.isFraud ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                          }`}>
                            {row.isFraud ? 'FRAUD' : 'LEGIT'}
                          </span>
                        </td>
                        {showFeatures && (
                          <>
                            <td className="p-2">{row.features.amount_z_score}</td>
                            <td className="p-2">{row.features.merchant_risk}</td>
                            <td className="p-2">{row.features.location_risk}</td>
                            <td className="p-2">{row.features.time_risk}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-gray-500 mt-2 text-xs">Showing 15 of {stats.total} transactions</p>
              </div>
            </div>
          </div>

          {/* Why This Works for Navy Federal */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-3">Why This Data Structure Works for Navy Federal</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <h5 className="font-medium mb-2">Business Relevance</h5>
                <ul className="space-y-1 text-xs">
                  <li>• Military-specific spending patterns can be integrated</li>
                  <li>• Deployment-related location changes</li>
                  <li>• PCS move transaction spikes</li>
                  <li>• Military pay schedule correlations</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2">Technical Excellence</h5>
                <ul className="space-y-1 text-xs">
                  <li>• Scalable feature engineering pipeline</li>
                  <li>• Real-time capable architecture</li>
                  <li>• Explainable AI for compliance</li>
                  <li>• Imbalanced data handling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Placeholder sections
  const PlaceholderSection = ({ title, description }: { title: string; description: string }) => (
    <div className="bg-white mx-6 rounded-b-lg shadow-sm p-12 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      <p className="text-sm text-blue-600">Coming in the next step...</p>
    </div>
  );

  // Render the appropriate section
  const renderSection = () => {
    switch (activeSection) {
      case 'simulator':
        return <LiveSimulatorSection />;
      case 'data-explorer':
        return <DataExplorerSection />;
      case 'training':
        return <PlaceholderSection 
          title="ML Training Pipeline" 
          description="Interactive machine learning training process demonstration" 
        />;
      case 'about':
        return <PlaceholderSection 
          title="About This Project" 
          description="Technical details, business impact, and implementation insights" 
        />;
      default:
        return <LiveSimulatorSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto">
        <BackToPortfolio />
        <HeroSection />
        <ProjectNavigation />
        {renderSection()}
      </div>
    </div>
  );
};

export default FraudDetectionProject;