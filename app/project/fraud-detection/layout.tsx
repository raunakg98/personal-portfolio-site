import type { Metadata } from 'next'
import './fraud-detection.css' // We'll create this

export const metadata: Metadata = {
  title: 'Fraud Detection System | Raunak Ghawghawe',
  description: 'Real-time credit card fraud detection system using Machine Learning and explainable AI',
  keywords: 'machine learning, fraud detection, credit, ensemble methods, explainable AI'
}


export default function FraudDetectionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="fraud-detection-layout">
      {children}
    </div>
  )
}