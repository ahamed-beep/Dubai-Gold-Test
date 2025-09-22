"use client"

import React, { useState, useRef, useEffect } from "react"
import { QRCodeSVG } from "qrcode.react"
import { X } from "lucide-react"
import axiosInstance from "../api/axios" // make sure path is correct

const Verifygold = () => {
  const [serialNumber, setSerialNumber] = useState("")
  const [showCertificate, setShowCertificate] = useState(false)
  const [metalData, setMetalData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showCertificate ? "hidden" : "unset"
    return () => { document.body.style.overflow = "unset" }
  }, [showCertificate])

  const fetchMetalData = async () => {
    if (!serialNumber) {
      alert("Please enter serial number")
      return
    }

    setLoading(true)
    setError("")
    try {
      const response = await axiosInstance.get(`/metals/${serialNumber}`)
      setMetalData(response.data.data)
      setShowCertificate(true)
    } catch (err) {
      setError("Serial number not found")
      setMetalData(null)
      setShowCertificate(false)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchMetalData()
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit(e)
  }

  const handleButtonClick = () => fetchMetalData()
  const handleCloseModal = () => setShowCertificate(false)

  return (
    <main className="min-h-screen relative">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/Images/burj.png')`, // Replace with your image path
        }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0  bg-opacity-40"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 p-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl mt-10 font-bold text-white mb-15 text-start md:ml-25">
           Verification 
          </h1>

          <div className="space-y-6 md:ml-25 w-full md:w-250 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg backdrop-blur-sm">
            <div className="space-y-2">
              <label htmlFor="item-serial" className="text-sm font-medium text-gray-700">
                Item serial number
              </label>
              <input
                id="item-serial"
                type="text"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                onKeyPress={handleKeyPress}
                className="md:w-250 border-gray-300 w-full h-9 px-3 border border-input rounded-md focus:outline-none focus:ring-0 focus:ring-ring focus:border-yellow-300"
              />
            </div>

            <hr className="border-t-1 border-gray-300" />

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="pt-4">
              <button
                type="button"
                onClick={handleButtonClick}
                className="bg-yellow-300 hover:bg-yellow-400 text-gray-600 text-sm px-5 py-2 rounded-md transition-colors duration-200"
              >
                {loading ? "Loading..." : "VIEW CERTIFICATE"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && metalData && (
        <>
          <div
            className="fixed inset-0 bg-gradient-to-br from-gray-800 via-gray-800 to-black opacity-80 z-40"
            onClick={handleCloseModal}
          ></div>

          <button
            onClick={handleCloseModal}
            className="fixed p-1 border-2 border-white top-4 right-8 z-50 bg-black text-white rounded-sm flex font-bold"
          >
            <X size={30} />
          </button>

          <div className="fixed inset-0 z-45">
            <div className="bg-white w-full h-full relative overflow-y-auto">
              <CertificatePopup metalData={metalData} />
            </div>
          </div>
        </>
      )}
    </main>
  )
}

const CertificatePopup = ({ metalData }) => {
  const certificateRef = useRef(null)
  const websiteUrl = "https://dubaigold-barmaker.netlify.app/"

  const downloadCertificate = () => {
    const printWindow = window.open("", "_blank")
    const certificateHtml = certificateRef.current.innerHTML

    const qrSvg = certificateRef.current.querySelector("svg")
    const svgData = new XMLSerializer().serializeToString(qrSvg)

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Certificate ${metalData.serial_number}</title>
        <style>
          * { margin:0; padding:0; box-sizing:border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background:white; color:#1f2937; line-height:1.5; }
          @media print { .no-print{ display:none !important;} }
          .certificate-container { max-width:672px; margin:0 auto; padding:32px; background:white; }
          .header { text-align:center; margin-bottom:32px; }
          .company-title { font-size:2.5rem; font-weight:bold; color:#DB9500; margin-bottom:8px; }
          .company-subtitle { font-size:.875rem; color:#4b5563; }
          .certificate-title { text-align:center; margin-bottom:32px; font-size:1.875rem; font-weight:600; color:#1f2937; }
          .details-section { margin-bottom:32px; }
          .detail-row { display:flex; justify-content:space-between; align-items:center; padding:12px 0; font-size:1.125rem; border-bottom:1px solid #f3f4f6; }
          .detail-row:last-child { border-bottom:none; }
          .detail-label { font-weight:600; color:#1f2937; }
          .detail-value { color:#374151; text-transform:uppercase; }
          .detail-value.normal-case { text-transform:none; }
          .certified-section { margin-bottom:32px; }
          .certified-title { font-size:1.125rem; font-weight:600; color:#1f2937; margin-bottom:16px; }
          .seller-text { font-size:.875rem; color:#DB9500; line-height:1.4; }
          .qr-section { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:24px; }
        </style>
      </head>
      <body>
        <div class="certificate-container">
          <div class="header">
            <div class="company-title">DUBAI Gold/Silver-BarMaker</div>
            <div class="company-subtitle">Made in Pakistan</div>
          </div>

          <div class="certificate-title">Certificate</div>

          <div class="details-section">
            <div class="detail-row"><span class="detail-label">Metal Type</span><span class="detail-value">${metalData.metal_type}</span></div>
            <div class="detail-row"><span class="detail-label">Weight</span><span class="detail-value normal-case">${metalData.weight} ${metalData.weight_type}</span></div>
            <div class="detail-row"><span class="detail-label">Fineness/Purity</span><span class="detail-value normal-case">${metalData.fine_weight}</span></div>
            <div class="detail-row"><span class="detail-label">Serial Number</span><span class="detail-value normal-case">${metalData.serial_number}</span></div>
          </div>

          <div class="certified-section">
            <div class="certified-title">Certified Seller</div>
            <div class="seller-text">Dubai<br/>GOLD/SILVER-BARMAKER</div>
          </div>

          <div class="qr-section">${svgData}</div>

          <div class="mt-8 text-sm text-gray-500 text-center">
            <p>This product ${metalData.serial_number} and its certificate are not challengeable in any court of law.</p>
          </div>
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              window.onafterprint = function() { window.close(); }
            }, 500);
          }
        </script>
      </body>
      </html>
    `)

    printWindow.document.close()
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 text-right">
        <button
          onClick={downloadCertificate}
          className="bg-[#F0B100] hover:bg-yellow-500 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Download Certificate
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div ref={certificateRef} className="bg-white p-8 max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-[#DB9500] mb-2">DUBAI Gold/Silver-BarMaker</div>
            <div className="text-sm text-gray-600">Made in Pakistan</div>
          </div>

          {/* Certificate Title */}
          <div className="text-center mb-8 text-3xl font-semibold text-gray-800">Certificate</div>

          {/* Certificate Details */}
          <div className="space-y-4 mb-8 text-lg">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-800">Metal Type</span>
              <span className="text-gray-700 uppercase">{metalData.metal_type}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-800">Weight</span>
              <span className="text-gray-700">{metalData.weight} {metalData.weight_type}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-800">Fineness/Purity</span>
              <span className="text-gray-700">{metalData.fine_weight}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-800">Serial Number</span>
              <span className="text-gray-700">{metalData.serial_number}</span>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex items-end justify-between mb-6">
            <QRCodeSVG value={websiteUrl} size={120} level="M" includeMargin={false} />
          </div>

          {/* Footer */}
          <div className="mt-8 text-sm text-gray-500 text-center">
            <p>This product {metalData.serial_number} and its certificate are not challengeable in any court of law.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Verifygold
