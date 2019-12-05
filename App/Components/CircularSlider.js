import React, { Component } from 'react'
import { PanResponder, View, Image, ImageBackground } from 'react-native'
import Svg, { SvgXml, Path, Circle, G, Text } from 'react-native-svg'

// From https://github.com/steveliles/react-native-circular-slider-example/blob/master/CircularSlider.js

class CircularSlider extends Component {

    constructor(props) {
        super(props)
        this.handlePanResponderMove = this.handlePanResponderMove.bind(this)
        this.cartesianToPolar = this.cartesianToPolar.bind(this)
        this.polarToCartesian = this.polarToCartesian.bind(this)
        const { width, height } = props
        const smallestSide = (Math.min(width, height))
        this.state = {
            cx: width / 2,
            cy: height / 2,
            r: (smallestSide / 2) * 0.75
        }
    }

    componentWillMount = () => {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: this.handlePanResponderMove
        })
    }

    polarToCartesian(angle) {
        const { cx, cy, r } = this.state
            , a = (angle - 270) * Math.PI / 180.0
            , x = cx + (r * Math.cos(a))
            , y = cy + (r * Math.sin(a))
        return { x, y }
    }

    cartesianToPolar(x, y) {
        const { cx, cy } = this.state
        return Math.round((Math.atan((y - cy) / (x - cx))) / (Math.PI / 180) + ((x > cx) ? 270 : 90))
    }

    handlePanResponderMove({ nativeEvent: { locationX, locationY } }) {
        this.props.onValueChange(this.cartesianToPolar(locationX, locationY))
    }

    render() {
        const { width, height, value, meterColor, textColor, moodFace, holeColors, mouthW, mouthHOffset, onValueChange} = this.props
            , { cx, cy, r } = this.state
            , startCoord = this.polarToCartesian(0)
            , endCoord = this.polarToCartesian(value)

        return (
            <Svg onLayout={this.onLayout} width={width} height={height}>
                <Circle cx={cx} cy={cy} r={r} stroke={meterColor} strokeWidth={12} fill='none' />
                <Path stroke={meterColor} strokeWidth={12} fill='none'
                    d={`M${startCoord.x} ${startCoord.y} A ${r} ${r} 0 ${value > 180 ? 1 : 0} 1 ${endCoord.x} ${endCoord.y}`} />
                <G>
                    <Circle cx={cx} cy={cy - r} r={5} fill={holeColors[0]} />
                    <Circle cx={cx - Math.sqrt(Math.pow(r, 2) - Math.pow(r * 0.8, 2))} cy={cy + (r * 0.8)} r={5} fill={holeColors[2]} />
                    <Circle cx={cx + Math.sqrt(Math.pow(r, 2) - Math.pow(r * 0.8, 2))} cy={cy + (r * 0.8)} r={5} fill={holeColors[2]} />
                    <Circle cx={cx + Math.sqrt(Math.pow(r, 2) - Math.pow(r * 0.33, 2))} cy={cy - (r * 0.33)} r={5} fill={holeColors[1]} />
                    <Circle cx={cx - Math.sqrt(Math.pow(r, 2) - Math.pow(r * 0.33, 2))} cy={cy - (r * 0.33)} r={5} fill={holeColors[1]} />
                </G>
                <G x={endCoord.x - 7.5} y={endCoord.y - 7.5}>
                    <Circle cx={7.5} cy={7.5} r={15} stroke={'#FFFFFF'} strokeWidth={10} fill={meterColor} {...this._panResponder.panHandlers} />
                </G>
                <G x={cx - (113 / 2)} y={cy - (130 / 2)}>
                    <SvgXml xml={eyesXml} />
                </G>
                <G x={cx-(mouthW/2)} y={cy+mouthHOffset}>
                    <SvgXml xml={moodFace} />
                </G>


            </Svg>
        )
    }
}

const eyesXml = `<svg width="113" height="31" viewBox="0 0 113 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="15.265" cy="15.265" r="15.265" fill="black"/>
<circle cx="97.0066" cy="15.265" r="15.265" fill="black"/>
</svg>
`

export default CircularSlider