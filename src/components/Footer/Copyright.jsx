import React from 'react'

const Copyright = () => {
  const year = new Date().getFullYear()
  return (
    <>
      <footer className="bg-primary py-2">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="mb-0 text-white text-center">&copy; {year} All Rights Reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Copyright