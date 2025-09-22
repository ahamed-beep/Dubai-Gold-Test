"use client"

import { useState, useEffect } from "react"
import { Search, Eye, Edit, X, Filter, Calendar, Weight, Layers } from "lucide-react"
import { Link } from "react-router-dom"

// Sample data - replace with your actual data
const sampleMetalsData = [
  {
    serial_number: "GLD001",
    origin: "Dubai",
    production_date: "2024-01-15",
    weight_type: "gram",
    weight: "10",
    fine_weight: "999.9",
    metal_type: "gold",
    username: "admin"
  },
  {
    serial_number: "SLV002",
    origin: "Karachi",
    production_date: "2024-02-20",
    weight_type: "tola",
    weight: "5",
    fine_weight: "999.0",
    metal_type: "silver",
    username: "manager"
  },
  {
    serial_number: "GLD003",
    origin: "Lahore",
    production_date: "2024-03-10",
    weight_type: "kg",
    weight: "1",
    fine_weight: "916.0",
    metal_type: "gold",
    username: "operator"
  }
]

export default function MiniGoldManagement() {
  const [metals, setMetals] = useState(sampleMetalsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [weightTypeFilter, setWeightTypeFilter] = useState("all")
  const [metalTypeFilter, setMetalTypeFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Filter metals based on search & filters
  const filteredData = metals.filter((item) => {
    const matchesSearch =
      item.serial_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.origin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.metal_type?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesWeightType =
      weightTypeFilter === "all" ||
      item.weight_type?.toLowerCase() === weightTypeFilter.toLowerCase()

    const matchesMetalType =
      metalTypeFilter === "all" ||
      item.metal_type?.toLowerCase() === metalTypeFilter.toLowerCase()

    const matchesDate =
      dateFilter === "" || item.production_date === dateFilter

    return matchesSearch && matchesWeightType && matchesMetalType && matchesDate
  })

  const getMetalTypeColor = (metalType) => {
    switch (metalType?.toLowerCase()) {
      case "gold":
        return "text-yellow-700 bg-yellow-100 border-yellow-200"
      case "silver":
        return "text-gray-700 bg-gray-100 border-gray-200"
      default:
        return "text-gray-700 bg-gray-100 border-gray-200"
    }
  }

  const getWeightTypeColor = (weightType) => {
    switch (weightType?.toLowerCase()) {
      case "kg":
        return "text-green-700 bg-green-100 border-green-200"
      case "tola":
        return "text-blue-700 bg-blue-100 border-blue-200"
      case "gram":
        return "text-purple-700 bg-purple-100 border-purple-200"
      default:
        return "text-gray-700 bg-gray-100 border-gray-200"
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setWeightTypeFilter("all")
    setMetalTypeFilter("all")
    setDateFilter("")
  }

  // Mobile Card Component
  const MobileCard = ({ item, index }) => (
    <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {item.serial_number}
          </h3>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">{item.origin}</span>
            <span className="mx-2">•</span>
            <span>{item.username}</span>
          </div>
        </div>
        <div className="flex gap-1 ml-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-4 h-4" />
          </button>
          <Link to='/detail'>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Edit className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>

      {/* Type Badges */}
      <div className="flex gap-2 mb-3">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getMetalTypeColor(item.metal_type)}`}>
          <Layers className="w-3 h-3 mr-1" />
          {item.metal_type}
        </span>
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getWeightTypeColor(item.weight_type)}`}>
          <Weight className="w-3 h-3 mr-1" />
          {item.weight_type}
        </span>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">Weight</div>
          <div className="font-semibold text-gray-900">{item.weight}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">Fine Weight</div>
          <div className="font-semibold text-green-600">{item.fine_weight}g</div>
        </div>
      </div>

      {/* Production Date */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-gray-500">Production:</span>
          <span className="ml-1 font-medium">{item.production_date}</span>
        </div>
      </div>
    </div>
  )

  // Desktop Table Row Component
  const DesktopTableRow = ({ item, index }) => (
    <tr key={index} className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {item.serial_number}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
          {item.origin}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {item.production_date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getWeightTypeColor(item.weight_type)}`}>
          {item.weight_type}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {item.weight}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
        {item.fine_weight}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getMetalTypeColor(item.metal_type)}`}>
          {item.metal_type}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
          {item.username}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
            <X className="w-4 h-4" />
          </button>
          <Link to='/detail'>
            <button className="inline-flex items-center justify-center h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
              <Edit className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </td>
    </tr>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Metal Bars</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
        
        {/* Mobile Search */}
        <div className="mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search serial number, origin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Mobile Filters Dropdown */}
        {showFilters && (
          <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Metal Type
                </label>
                <select
                  value={metalTypeFilter}
                  onChange={(e) => setMetalTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                >
                  <option value="all">All Metal Types</option>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight Type
                </label>
                <select
                  value={weightTypeFilter}
                  onChange={(e) => setWeightTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                >
                  <option value="all">All Weight Types</option>
                  <option value="kg">Kg</option>
                  <option value="tola">Tola</option>
                  <option value="gram">Gram</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Production Date
                </label>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                />
              </div>
              
              <button
                onClick={clearFilters}
                className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Mobile Results Count */}
        <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
          <span>{filteredData.length} items found</span>
          {(searchTerm || metalTypeFilter !== "all" || weightTypeFilter !== "all" || dateFilter) && (
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Header Search Section */}
          <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <Search className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600 font-medium">
                Search & Filter Gold/Silver Bars
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Serial number, origin, username..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Weight Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight Type
                </label>
                <select
                  value={weightTypeFilter}
                  onChange={(e) => setWeightTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                >
                  <option value="all">All Weight Types</option>
                  <option value="kg">Kg</option>
                  <option value="tola">Tola</option>
                  <option value="gram">Gram</option>
                </select>
              </div>

              {/* Metal Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Metal Type
                </label>
                <select
                  value={metalTypeFilter}
                  onChange={(e) => setMetalTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                >
                  <option value="all">All Metal Types</option>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                </select>
              </div>

              {/* Date Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Production Date
                </label>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                />
              </div>
            </div>
          </div>

          {/* Mobile Cards View */}
          <div className="lg:hidden">
            {filteredData.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="text-gray-400 mb-2">
                  <Search className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No items found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="space-y-0">
                {filteredData.map((item, index) => (
                  <MobileCard key={index} item={item} index={index} />
                ))}
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white border-gray-200 rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                All Metal Bars ({filteredData.length} items)
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-gray-200 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Serial Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Origin
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Production Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Weight Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Weight
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fine Weight (Grams)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Metal Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((item, index) => (
                    <DesktopTableRow key={index} item={item} index={index} />
                  ))}
                </tbody>
              </table>
            </div>

            {filteredData.length === 0 && (
              <div className="p-8 text-center">
                <div className="text-gray-400 mb-2">
                  <Search className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No items found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}