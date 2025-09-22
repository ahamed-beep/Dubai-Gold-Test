import axiosInstance from "../../api/axios";

"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Download, Printer, X } from "lucide-react"
import QRCode from "react-qr-code"
import { toast } from "react-toastify";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    barNumber: "",
    accountType: "Kg",
    firstName: "",
    lastName: "",
    metalType: "GOLD",
    serialNumber: "",
    origin: "",
    productionDate: "",
    username: "",
  })
  
  const [errors, setErrors] = useState({})
  const [showToast, setShowToast] = useState(false)
  const [showCertificate, setShowCertificate] = useState(false)

    const initialFormData = {
    barNumber: "",
    accountType: "Kg",
    firstName: "",
    lastName: "",
    metalType: "GOLD",
    serialNumber: "",
    origin: "",
    productionDate: "",
    username: "",
  }

  // ✅ Scroll lock jab popup khula ho
  useEffect(() => {
    if (showCertificate) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [showCertificate])

  const handleReset = () => {
    setFormData(initialFormData)
  }

 const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}) 
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post("/metals", {
        serial_number: formData.serialNumber,
        origin: formData.origin,
        production_date: formData.productionDate,
        weight_type: formData.accountType,
        weight: formData.firstName,
        fine_weight: formData.lastName,
        metal_type: formData.metalType,
        username: formData.username,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
 
      // Update with API response (fallback to form data if not returned)
      setFormData({
        barNumber: response.data?.barNumber || formData.barNumber,
        accountType: response.data?.weight_type || formData.accountType,
        firstName: response.data?.weight || formData.firstName,
        lastName: response.data?.fine_weight || formData.lastName,
        metalType: response.data?.metal_type || formData.metalType,
        serialNumber: response.data?.serial_number || formData.serialNumber,
        origin: response.data?.origin || formData.origin,
        productionDate: response.data?.production_date || formData.productionDate,
        username: response.data?.username || formData.username,
      });
 
      setShowCertificate(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
       if (error.response?.status === 422) {
      // <-- validation error from backend
      setErrors(error.response.data.errors) // <-- store errors in state
    } else {
      toast.error("Failed to store data!")
      console.error(error.response?.data || error.message)
    }
    }
  }
  const handleNumberChange = (field, value) => {
    if (value === "" || Number.parseFloat(value) >= 0) {
      setFormData({ ...formData, [field]: value })
    }
  }

  // ✅ Print
  const handlePrint = () => {
    const printContent = document.getElementById("certificate-content")
    const newWin = window.open("", "_blank")
    newWin.document.write(`
      <html>
        <head>
          <title>Certificate</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
          </style>
        </head>
        <body>${printContent.innerHTML}</body>
      </html>
    `)
    newWin.document.close()
    newWin.print()
  }

  // ✅ Download as Image
  const handleDownload = () => {
    const node = document.getElementById("certificate-content")
    import("html2canvas").then(({ default: html2canvas }) => {
      html2canvas(node).then((canvas) => {
        const link = document.createElement("a")
        link.download = "certificate.png"
        link.href = canvas.toDataURL("image/png")
        link.click()
      })
    })
  }

  return (
    <div className="w-full bg-white shadow-sm border border-gray-200 rounded-lg relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-slide-in">
          <CheckCircle className="h-5 w-5" />
          <span>Reminder added successfully!</span>
        </div>
      )}

      {showCertificate && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto relative">
            {/* Close   Actions */}
            <div className="absolute top-3 right-3 flex gap-3">
            
              <button
                onClick={handlePrint}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
              >
                <Printer className="w-5 h-5 z-10" />
              </button>
              <button
                onClick={() => {
  setShowCertificate(false);
  handleReset();   // reset form only when popup closes
}}
                className="p-2 bg-red-100 hover:bg-red-200 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 flex justify-center">
              <div
                id="certificate-content"
                className="bg-white p-4 relative"
                style={{ width: "800px", height: "500px" }}
              >
                {/* Header with logo and title */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <img className="w-18 h-18" src="/Images/goldlogo.png" />
                    <div>
                      <div className="text-yellow-600 font-bold text-2xl leading-tight tracking-wide">
                        Dubai Gold-Silver Bar Maker
                      </div>
                      <div
                        className="text-lg leading-tight text-gray-800"
                        style={{ fontFamily: "Arial", direction: "rtl" }}
                      >
                        دبئی گولڈ سلور بار میکر
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-2">
                      <QRCode
                        value={`https://dubaigoldsilver.com/certificate/${formData.username || "gold"}`}
                        size={80}
                        bgColor="#ffffff"
                        fgColor="#000000"
                      />
                    </div>
                    <div className="text-sm font-medium">
                      Date: {formData.productionDate || "___________"}
                    </div>
                  </div>
                </div>

                <table className="w-full border-collapse border-2 border-black text-sm mb-4">
                  <thead>
                    <tr>
                      <th className="border border-black p-3 bg-white text-center font-bold">
                        Bar Number
                        <br />
                        <span className="text-xs font-normal">نمبر بار</span>
                      </th>
                      <th className="border border-black p-3 bg-white text-center font-bold">
                        Weight
                        <br />
                        <span className="text-xs font-normal">وزن</span>
                      </th>
                      <th className="border border-black p-3 bg-white text-center font-bold">
                        Fine Weight in Grams
                        <br />
                        <span className="text-xs font-normal">خالص وزن گرام میں</span>
                      </th>
                      <th className="border border-black p-3 bg-white text-center font-bold">
                        Type
                        <br />
                        <span className="text-xs font-normal">قسم</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-black p-4 text-center font-medium">{formData.serialNumber}</td>
                      <td className="border border-black p-4 text-center font-medium">{formData.firstName}</td>
                      <td className="border border-black p-4 text-center font-medium">{formData.lastName}</td>
                      <td className="border border-black p-4 text-center font-medium">{formData.metalType}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="text-sm leading-tight text-gray-800">
                  <div className="font-medium">Shop#1, Aslam Plaza, Soha Bazar, Rang Mehal, Lahore.</div>
                  <div className="font-medium">Cell: 0300-0000000, www.Dubaigoldsilver.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="p-6 space-y-6">
        {/* Bar Number */}
       

        {/* Serial Number */}
        <div className="space-y-2">
          <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">
            Serial Number
          </label>
          <input
            id="serialNumber"
            type="text"
            placeholder="Enter serial number"
            value={formData.serialNumber}
             onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-900"
    />
  {errors.serial_number && (
    <p className="text-red-500 text-sm">{errors.serial_number[0]}</p> // <-- show error here
  )}
</div>

        {/* Origin */}
        <div className="space-y-2">
          <label htmlFor="origin" className="block text-sm font-medium text-gray-700">
            Origin
          </label>
          <input
            id="origin"
            type="text"
            placeholder="Enter origin"
            value={formData.origin}
            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-900"
            required
          />
          {errors.origin && (
    <p className="text-red-500 text-sm">{errors.origin[0]}</p> // <-- show error here
  )}
        </div>

        {/* Production Date */}
        <div className="space-y-2">
          <label htmlFor="productionDate" className="block text-sm font-medium text-gray-700">
            Production Date
          </label>
          <input
            id="productionDate"
            type="date"
            value={formData.productionDate}
            onChange={(e) => setFormData({ ...formData, productionDate: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-900"
          />
           {errors.production_date && (
    <p className="text-red-500 text-sm">{errors.production_date[0]}</p> // <-- show error here
  )}
        </div>

        {/* Weight Type */}
        <div className="space-y-2">
          <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">
            Weight Type
          </label>
          <select
            id="accountType"
            value={formData.accountType}
            onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
            className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-gray-900"
          >
            <option value="Kg">Kg</option>
            <option value="Tola">Tola</option>
            <option value="Gram">Gram</option>
          </select>
        </div>

        {/* Weight */}
        <div className="space-y-2">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            Weight
          </label>
          <input
            id="firstName"
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter weight"
            value={formData.firstName}
            onChange={(e) => handleNumberChange("firstName", e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-900"
          />
           {errors.weight && (
    <p className="text-red-500 text-sm">{errors.weight[0]}</p> // <-- show error here
  )}
        </div>

        {/* Fine Weight In Grams */}
        <div className="space-y-2">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Fine Weight In Grams
          </label>
          <input
            id="lastName"
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter fine weight"
            value={formData.lastName}
            onChange={(e) => handleNumberChange("lastName", e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-900"
          />
           {errors.fine_weight && (
    <p className="text-red-500 text-sm">{errors.fine_weight[0]}</p> // <-- show error here
  )}
        </div>

        {/* Type */}
           <div className="space-y-2">
          <label htmlFor="metalType" className="block text-sm font-medium text-gray-700">
            Metal Type <span className="text-red-500">*</span>
          </label>
          <select
            id="metalType"
            value={formData.metalType}
            onChange={(e) => setFormData({ ...formData, metalType: e.target.value })}
            className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-gray-900"
            required
          >
            <option value="GOLD">GOLD</option>
            <option value="SILVER">SILVER</option>
          </select>
        </div>

          <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter username (optional)"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-900"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Submit Data
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
