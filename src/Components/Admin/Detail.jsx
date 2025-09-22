"use client"

import React, { useState } from "react"

export default function DetailPage() {
  const [itemData, setItemData] = useState({
    SerialNumber: "4451",
    measurementUnit: "cm - Centimetres",
    unitFormat: "Fractions",
    sizeScaleType: "Alphanumeric",
    sizeScaleSteps: "XS, S, M, L, XL",
    serialNumber: "SN123456",
    origin: "Pakistan",
    productionDate: "2024-01-15",
    weightType: "Kg",
    weight: "2.5",
    fineWeight: "2500",
    metalType: "GOLD",
    username: "admin_user",
  })

  const [formData, setFormData] = useState(itemData)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setItemData(formData)
    alert("Data updated successfully!")
  }

  const handleCancel = () => {
    setFormData(itemData)
  }

  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Go Back Button */}
        <div className="flex items-center">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go Back
          </button>
        </div>
        {/* Information Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-gray-400"></div>
              <h2 className="text-lg font-medium text-gray-700">Information</h2>
            </div>
         
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-600">Serial Number</span>
                <p className="font-medium text-gray-900">{itemData.SerialNumber}</p>
              </div>
            
               <div>
                <span className="text-sm text-gray-600">Production Date</span>
                <p className="font-medium text-gray-900">{itemData.productionDate}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Weight</span>
                <p className="font-medium text-gray-900">{itemData.weight}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Metal Type</span>
                <p className="font-medium text-gray-900">{itemData.metalType}</p>
              </div>
             
           
            </div>
            <div className="space-y-4">
               <div>
                <span className="text-sm text-gray-600">Origin</span>
                <p className="font-medium text-gray-900">{itemData.origin}</p>
              </div>
           
               <div>
                <span className="text-sm text-gray-600">Weight Type</span>
                <p className="font-medium text-gray-900">{itemData.weightType}</p>
              </div>
            
             
              <div>
                <span className="text-sm text-gray-600">Fine Weight (Grams)</span>
                <p className="font-medium text-gray-900">{itemData.fineWeight}</p>
              </div>
              
              <div>
                <span className="text-sm text-gray-600">Username</span>
                <p className="font-medium text-gray-900">{itemData.username || "Not specified"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Update Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-700 mb-6">Update Information</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Serial Number</label>
                <input
                  type="text"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleInputChange}
                  placeholder="Enter serial number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Origin</label>
                <input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                  placeholder="Enter origin"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Production Date</label>
                <input
                  type="date"
                  name="productionDate"
                  value={formData.productionDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight Type</label>
                <select
                  name="weightType"
                  value={formData.weightType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="Kg">Kg</option>
                  <option value="Grams">Grams</option>
                  <option value="Pounds">Pounds</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="Enter weight"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fine Weight In Grams</label>
                <input
                  type="text"
                  name="fineWeight"
                  value={formData.fineWeight}
                  onChange={handleInputChange}
                  placeholder="Enter fine weight"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Metal Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="metalType"
                  value={formData.metalType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  required
                >
                  <option value="GOLD">GOLD</option>
                  <option value="SILVER">SILVER</option>
                  <option value="PLATINUM">PLATINUM</option>
                  <option value="COPPER">COPPER</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter username (optional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}