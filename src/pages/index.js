import React, { useRef, useEffect } from "react"

export default function Home() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const html = document.documentElement
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    const frameCount = 140
    const currentFrame = index =>
      `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index
        .toString()
        .padStart(4, "0")}.jpg`

    const images = []

    const preloadImages = () => {
      for (let i = 1; i < frameCount; i++) {
        images[i] = new Image()
        images[i].src = currentFrame(i)
      }
    }

    const img = new Image()
    img.src = currentFrame(1)
    img.onload = function () {
      context.drawImage(img, 0, 0)
    }

    const updateImage = index => {
      if (images[index]) {
        context.drawImage(images[index], 0, 0)
      }
    }

    window.addEventListener("scroll", () => {
      const scrollTop = html.scrollTop
      const maxScrollTop =
        html.scrollHeight - window.innerHeight - window.innerHeight
      const scrollFraction = scrollTop / maxScrollTop

      const frameIndex = 
      Math.min(
        frameCount - 10,
        Math.ceil(scrollFraction * frameCount)
      )
      
      requestAnimationFrame(() => updateImage(frameIndex + 1))
    })

    preloadImages()
  }, [])

  return <>
  <h1 align="center">Welcome to my animation page</h1>
  <h3 align="center">Scroll down to see the changes of this image</h3>

  <canvas ref={canvasRef} height="3000vh" width="1200vh" />
</>
}
