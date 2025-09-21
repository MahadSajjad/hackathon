import React from 'react'

const Copyright = () => {
  const year = new Date().getFullYear()
  return (
    <>
      <footer className="bg-dark py-2">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="mb-0 text-white text-center">&copy; {year} All Rights Reserved. <b>Developed By Mahad Sajjad</b> </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Copyright