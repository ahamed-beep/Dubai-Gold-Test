const AtombeatFooter = () => {
  return (
    <footer className="bg-black text-yellow-300">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          {/* Left side - Logo and mission */}
          <div className="flex-1 max-w-md">
            <div className="mb-6">
                <div>

        
                </div>
              <p className="text-lg font-bold text-yellow-500">DUBAI
Gold-BarMaker</p>
            </div>
            <p className="text-md text-white leading-relaxed mb-6">
              Our mission is to democratize computational drug discovery tools and empower researchers and organizations
              worldwide.
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10  rounded-full flex items-center justify-center transition-colors cursor-pointer">
            <img src="/Images/newwhat.png" />
              </div>
            </div>
          </div>
          {/* Right side - Navigation */}
          <div className="flex  flex-col md:mr-20 gap-4 justify-center text-center">
            <a href="#" className="text-white hover:text-blue-200 transition-colors text-lg">
              Home
            </a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors text-lg">
              Platform
            </a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors text-lg">
              Solutions
            </a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors text-lg">
              Company
            </a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors text-lg">
              Contact Us
            </a>
          </div>
        </div>
        {/* Bottom section */}
        <div className="flex flex-col lg:flex-row justify-between items-center pt-8 mt-8 border-t border-gray-300">
          <p className="text-sm text-blue-100">Copyright 2025© atombeat. All Rights Reserved</p>
       
        </div>
      </div>
    </footer>
  )
}

export default AtombeatFooter