"use client"

import React, { useState, useRef, useEffect } from "react"
import { QRCodeSVG } from "qrcode.react"
import { X, Download, AlertCircle } from "lucide-react"

// Sample data - replace with your actual data source
const sampleMetalData = {
  "ABC123": {
    metal_type: "GOLD",
    weight: "10",
    weight_type: "grams",
    fine_weight: "999.9",
    serial_number: "ABC123"
  },
  "XYZ789": {
    metal_type: "SILVER",
    weight: "50",
    weight_type: "grams", 
    fine_weight: "999.0",
    serial_number: "XYZ789"
  },
  "DEF456": {
    metal_type: "GOLD",
    weight: "5",
    weight_type: "grams",
    fine_weight: "916.0",
    serial_number: "DEF456"
  }
}

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
    if (!serialNumber.trim()) {
      setError("Please enter a valid serial number")
      return
    }

    setLoading(true)
    setError("")
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const data = sampleMetalData[serialNumber.trim().toUpperCase()]
      
      if (data) {
        setMetalData(data)
        setShowCertificate(true)
      } else {
        setError("Serial number not found. Try: ABC123, XYZ789, or DEF456")
        setMetalData(null)
        setShowCertificate(false)
      }
    } catch (err) {
      console.error("Error:", err)
      setError("Unable to verify serial number. Please try again.")
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

  const handleInputChange = (e) => {
    setSerialNumber(e.target.value)
    if (error) setError("") // Clear error when user starts typing
  }

  const handleCloseModal = () => {
    setShowCertificate(false)
    setMetalData(null)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Escape" && showCertificate) {
      handleCloseModal()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [showCertificate])

  return (
    <main className="min-h-screen relative">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/Images/burj.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 p-4 sm:p-8 flex items-center justify-center min-h-screen">
        <div className="max-w-2xl w-full flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 md:mb-12 text-center drop-shadow-lg">
            Verification 
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
            <div className="bg-white bg-opacity-95 p-6 rounded-lg shadow-xl backdrop-blur-sm">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label 
                    htmlFor="item-serial" 
                    className="text-sm font-medium text-gray-700 block"
                  >
                    Item Serial Number
                  </label>
                  <input
                    id="item-serial"
                    type="text"
                    value={serialNumber}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder="Enter serial number"
                    className={`w-full h-11 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors duration-200 ${
                      error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                </div>

                {error && (
                  <div className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-3 rounded-md">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}

                <hr className="border-gray-300" />

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading || !serialNumber.trim()}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-800 font-medium text-sm px-5 py-3 rounded-md transition-all duration-200 transform hover:scale-105 disabled:transform-none"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                      </span>
                    ) : (
                      "VIEW CERTIFICATE"
                    )}
                  </button>
                </div>

                {/* Sample Serial Numbers for Testing */}
                <div className="text-xs text-gray-500 text-center mt-2">
                  Sample numbers: ABC123, XYZ789, DEF456
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && metalData && (
        <CertificateModal metalData={metalData} onClose={handleCloseModal} />
      )}

      {/* Logo */}
      <div className="absolute bottom-5 right-5 z-30">
        <img 
          src="/Images/stamp.png" 
          alt="Company Stamp" 
          className="w-20 h-20 object-contain opacity-80"
        />
      </div>
    </main>
  )
}

const CertificateModal = ({ metalData, onClose }) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-50 bg-black bg-opacity-80 hover:bg-opacity-100 text-white p-2 rounded-full transition-all duration-200"
        aria-label="Close certificate"
      >
        <X size={24} />
      </button>

      <div className="fixed inset-0 z-45 overflow-hidden">
        <div className="bg-white w-full h-full overflow-y-auto">
          <CertificateContent metalData={metalData} />
        </div>
      </div>
    </>
  )
}

const CertificateContent = ({ metalData }) => {
  const certificateRef = useRef(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const websiteUrl = "https://dubaigold-barmaker.netlify.app/"

  const convertImageToBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        resolve(canvas.toDataURL('image/png'))
      }
      img.onerror = reject
      img.src = url
    })
  }

  const downloadCertificate = async () => {
    if (isDownloading) return
    
    setIsDownloading(true)
    
    try {
      const logoBase64 = await convertImageToBase64('/Images/newlogo.png')
      const printWindow = window.open("", "_blank")
      
      if (!printWindow) {
        throw new Error("Popup blocked. Please allow popups for this site.")
      }

      const qrSvg = certificateRef.current?.querySelector("svg")
      if (!qrSvg) {
        throw new Error("QR code not found")
      }
      
      const svgData = new XMLSerializer().serializeToString(qrSvg)

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Certificate - ${metalData.serial_number}</title>
          <meta charset="UTF-8">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; 
              background: white; 
              color: #1f2937; 
              line-height: 1.5; 
              padding: 20px;
            }
            @media print { 
              body { padding: 0; }
              .no-print { display: none !important; }
            }
            .certificate-container { 
              max-width: 672px; 
              margin: 0 auto; 
              padding: 32px; 
              background: white; 
              border: 2px solid #e5e7eb;
              border-radius: 8px;
            }
            .header { text-align: center; margin-bottom: 32px; }
            .header-flex { 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              margin-bottom: 16px; 
              flex-wrap: wrap;
            }
            .logo { 
              width: 80px; 
              height: 80px; 
              margin-right: 16px; 
              object-fit: contain; 
            }
            .company-title { 
              font-size: 2rem; 
              font-weight: bold; 
              color: #DB9500; 
              margin: 0; 
            }
            .company-subtitle { 
              font-size: 1rem; 
              color: #4b5563; 
              margin-top: 8px; 
            }
            .certificate-title { 
              text-align: center; 
              margin-bottom: 32px; 
              font-size: 1.875rem; 
              font-weight: 600; 
              color: #1f2937;
              text-decoration: underline;
            }
            .details-section { margin-bottom: 32px; }
            .detail-row { 
              display: flex; 
              justify-content: space-between; 
              align-items: center; 
              padding: 16px 0; 
              font-size: 1.125rem; 
              border-bottom: 1px solid #e5e7eb; 
            }
            .detail-row:last-child { border-bottom: none; }
            .detail-label { font-weight: 600; color: #1f2937; }
            .detail-value { 
              color: #374151; 
              text-transform: uppercase; 
              font-weight: 500;
            }
            .detail-value.normal-case { text-transform: none; }
            .qr-section { 
              display: flex; 
              align-items: flex-end; 
              justify-content: flex-start; 
              margin-bottom: 24px; 
            }
            .footer { 
              margin-top: 32px; 
              font-size: 0.875rem; 
              color: #6b7280; 
              text-align: center; 
              font-style: italic;
              border-top: 1px solid #e5e7eb;
              padding-top: 16px;
            }
            @media (max-width: 640px) {
              .company-title { font-size: 1.5rem; }
              .header-flex { flex-direction: column; }
              .logo { margin-right: 0; margin-bottom: 16px; }
            }
          </style>
        </head>
        <body>
          <div class="certificate-container">
            <div class="header">
              <div class="header-flex">
                <img src="${logoBase64}" class="logo" alt="Dubai GoldBarMaker Logo" />
                <div class="company-title">DUBAI Gold/Silver-BarMaker</div>
              </div>
              <div class="company-subtitle">Made in Pakistan</div>
            </div>

            <div class="certificate-title">Certificate of Authenticity</div>

            <div class="details-section">
              <div class="detail-row">
                <span class="detail-label">Metal Type</span>
                <span class="detail-value">${metalData.metal_type || 'N/A'}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Weight</span>
                <span class="detail-value normal-case">${metalData.weight || 'N/A'} ${metalData.weight_type || ''}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Fineness/Purity</span>
                <span class="detail-value normal-case">${metalData.fine_weight || 'N/A'}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Serial Number</span>
                <span class="detail-value normal-case">${metalData.serial_number || 'N/A'}</span>
              </div>
            </div>

            <div class="qr-section">${svgData}</div>

            <div class="footer">
              <p>This product ${metalData.serial_number} and its certificate are not challengeable in any court of law.</p>
              <p style="margin-top: 8px;">Generated on: ${new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.onafterprint = function() { 
                  setTimeout(function() { window.close(); }, 100);
                }
              }, 1000);
            }
          </script>
        </body>
        </html>
      `)

      printWindow.document.close()
    } catch (error) {
      console.error('Certificate download error:', error)
      alert(`Error downloading certificate: ${error.message}`)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Certificate of Authenticity</h2>
        <button
          onClick={downloadCertificate}
          disabled={isDownloading}
          className="bg-[#F0B100] hover:bg-yellow-500 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors duration-200"
        >
          <Download size={16} />
          <span>{isDownloading ? 'Downloading...' : 'Download Certificate'}</span>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-gray-100">
        <div ref={certificateRef} className="bg-white p-6 sm:p-8 max-w-2xl w-full shadow-lg rounded-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4 flex-wrap">
              <img
                src="/Images/newlogo.png"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain mr-4"
                alt="Dubai GoldBarMaker Logo"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
              <div className="text-xl sm:text-2xl md:text-4xl font-bold text-[#DB9500]">
                DUBAI Gold/Silver-BarMaker
              </div>
            </div>
            <div className="text-sm md:text-lg text-gray-600">Made in Pakistan</div>
          </div>

          {/* Certificate Title */}
          <div className="text-center mb-8 text-2xl sm:text-3xl font-semibold text-gray-800 underline">
            Certificate of Authenticity
          </div>

          {/* Certificate Details */}
          <div className="space-y-0 mb-8 text-base sm:text-lg">
            {[
              { label: "Metal Type", value: metalData.metal_type, uppercase: true },
              { label: "Weight", value: `${metalData.weight} ${metalData.weight_type}`, uppercase: false },
              { label: "Fineness/Purity", value: metalData.fine_weight, uppercase: false },
              { label: "Serial Number", value: metalData.serial_number, uppercase: false }
            ].map((item, index, array) => (
              <div 
                key={item.label}
                className={`flex justify-between border-gray-200 py-4 ${
                  index < array.length - 1 ? 'border-b' : ''
                }`}
              >
                <span className="font-semibold text-gray-800">{item.label}</span>
                <span className={`text-gray-700 ${item.uppercase ? 'uppercase' : ''} font-medium`}>
                  {item.value || 'N/A'}
                </span>
              </div>
            ))}
          </div>

          {/* QR Code */}
          <div className="flex items-end justify-start mb-6">
            <QRCodeSVG 
              value={websiteUrl} 
              size={100} 
              level="M" 
              includeMargin={false}
              className="border border-gray-200 p-2"
            />
          </div>

          {/* Footer */}
          <div className="mt-8 text-xs sm:text-sm text-gray-500 text-center border-t pt-4">
            <p className="font-medium">
              This product {metalData.serial_number} and its certificate are not challengeable in any court of law.
            </p>
            <p className="mt-2">Generated on: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Verifygold