import {CSSProperties, useEffect, useState} from 'react'

const delay : number = 20 
const scGap : number = 0.02 

export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0 
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    })
    return {
        w, 
        h
    }
}

const maxScale = (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n)
const divideScale = (scale : number, i : number, n : number) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 
const sinify = (scale : number) : number => Math.sin(scale * Math.PI)

export const useStyle = (w : number, h : number, scale : number) => {
    const sf : number = sinify(scale)
    const position = 'absolute'
    const size : number = Math.min(w, h) / 15
    const background : string = 'indigo'
    return {
        parentStyle() : CSSProperties {
            const left : string = `${w / 2}px`
            const top : string = `${h / 2}px`
            return {
                position, 
                left, 
                top
            }
        },
        bouncySq(i : number) : CSSProperties {
            const left : string = `${-size + size * i}px`
            const top : string = `${-size}px`
            const width : string = `${size}px`
            const height : string = `${-size + (h / 2) * divideScale(sf, i, 2)}px`
            return {
                position, 
                left, 
                top, 
                width, 
                height,
                background  
            }
        }
    } 

}