microbit_CAR.setPixelRGB(microbit_CAR.Lights.Light1, RGBColors.Red)
microbit_CAR.showLight()
basic.forever(function () {
    if (microbit_CAR.LineSensorChk(microbit_CAR.LineSensorIndex.LEFT, microbit_CAR.LineState.WHITE) && microbit_CAR.LineSensorChk(microbit_CAR.LineSensorIndex.RIGHT, microbit_CAR.LineState.WHITE)) {
        microbit_CAR.CarCtrl(microbit_CAR.CarState.FOREWARD)
    } else {
    	
    }
})
