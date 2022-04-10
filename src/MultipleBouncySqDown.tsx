import React from 'react'
import { useStyle } from './hooks'
import withContext from './withContext'

interface MBSDProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : Function
}
const MultipleBouncySqDown = (props : MBSDProps) => {
    const {parentStyle, bouncySq} = useStyle(props.w, props.h, props.scale)
    return (
        <div style = {parentStyle()}>
            {[0, 1].map(i => <div key = {`bouncy_${i}`} style = {bouncySq(i)}></div>)}
        </div>
    )
}

export default withContext(MultipleBouncySqDown)