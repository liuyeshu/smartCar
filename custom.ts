
/**
 * 使用此文件来定义自定义函数和图形块。
 * 想了解更详细的信息，请前往 https://makecode.microbit.org/blocks/custom
 */

/*****************************************************************************************************************************************
 *    智能小车 *****************************************************************************************************************************
 ****************************************************************************************************************************************/
//% color="#FF7F00" weight=21 icon="\uf185"
namespace microbit_小车 {
    export enum LedState {
        //% blockId="STATE_OFF" block="关闭"
        OFF = 0,
        //% blockId="STATE_ON" block="开启"
        ON 
    }

    export enum LedForwardIndex {
        //% blockId="LEFT" block="左边"
        LEFT = 0,
        //% blockId="RIGHT" block="右边"
        RIGHT 
    }

    export enum LineSensorIndex {
        //% blockId="LEFT" block="左边"
        LEFT = 0,
        //% blockId="RIGHT" block="右边"
        RIGHT 
    }

    export enum LineState {
        //% blockId="WHITE" block="白线"
        WHITE = 0,
        //% blockId="BLACK" block="黑线"
        BLACK = 1
    }

    export enum LightSensorIndex {
        //% blockId="LEFT" block="左边"
        LEFT = 0,
        //% blockId="RIGHT" block="右边"
        RIGHT 
    }

    export enum MusicIndex {
        dadadum = 0,
        entertainer,
        prelude,
        ode,
        nyan,
        ringtone,
        funk,
        blues,

        birthday,
        wedding,
        funereal,
        punchline,
        baddy,
        chase,
        ba_ding,
        wawawawaa,
        jump_up,
        jump_down,
        power_up,
        power_down
    }

    export enum MotorIndex {
        //% blockId="MOTOR_LEFT" block="左边"
        LEFT = 0,
        //% blockId="MOTOR_RIGHT" block="右边"
        RIGHT 
    }

    export enum MotorState {
        //% blockId="MOTOR_STOP" block="停止"
        STOP = 0,
        //% blockId="MOTOR_FOREWARD" block="正转"
        FOREWARD,
        //% blockId="MOTOR_BACKWARD" block="反转"
        BACKWARD
    }

    export enum CarState {
        //% blockId="CAR_STOP" block="停止"
        STOP = 0,
        //% blockId="CAR_FOREWARD" block="前行"
        FOREWARD,
        //% blockId="CAR_LEFT_FOREWARD" block="左前行"
        LEFT_FOREWARD,
        //% blockId="CAR_RIGHT_FOREWARD" block="右前行"
        RIGHT_FOREWARD,
        //% blockId="CAR_BACKWARD" block="后退"
        BACKWARD,
        //% blockId="CAR_LEFT_BACKWARD" block="左后退"
        LEFT_BACKWARD,
        //% blockId="CAR_RIGHT_BACKWARD" block="右后退"
        RIGHT_BACKWARD
    }

    //var
    let lineSensorThrold : number = 400;
    let edgeSensorThrold : number = 400;

    //% blockId=mbit_IoSet block="设置引脚|%pin 值为|%value"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    //% value.min=0 value.max=1
    export function IoSet(pin: DigitalPin, value: number): void {

        pins.setPull(pin, PinPullMode.PullUp);
        pins.digitalWritePin(pin, value);
    }

    //% blockId=mbit_LedForwardCtrl block="设置 |%index 前照灯状态为|%state"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    export function LedForwardCtrl(index: LedForwardIndex, state: LedState): void {
        if(LedForwardIndex.LEFT == index)
        {
            pins.setPull(DigitalPin.P12, PinPullMode.PullUp);
            if(LedState.ON == state)
            {
                pins.digitalWritePin(DigitalPin.P12, 1);
            }
            else
            {
                pins.digitalWritePin(DigitalPin.P12, 0);
            }
        }
        else
        {
            pins.setPull(DigitalPin.P16, PinPullMode.PullUp);
            if(LedState.ON == state)
            {
                pins.digitalWritePin(DigitalPin.P16, 1);
            }
            else
            {
                pins.digitalWritePin(DigitalPin.P16, 0);
            }
        }
    }

    //% blockId=mbit_MotroCtrl block="设置 |%index 电机状态为|%state"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    export function MotorCtrl(index: MotorIndex, state: MotorState): void {
        switch(index)
        {
                case MotorIndex.RIGHT:
                    switch(state)
                    {
                        case MotorState.STOP:
                            pins.setPull(DigitalPin.P5, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P5, 0);
                            pins.setPull(DigitalPin.P11, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P11, 0);
                            break;
                        break;
                    case MotorState.FOREWARD:
                            pins.setPull(DigitalPin.P5, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P5, 1);
                            pins.setPull(DigitalPin.P11, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P11, 0);
                            break;
                        break;
                    case MotorState.BACKWARD:
                            pins.setPull(DigitalPin.P5, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P5, 0);
                            pins.setPull(DigitalPin.P11, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P11, 1);
                            break;
                        break;                   
                        default:
                        break;
                    }
                    break;
                case MotorIndex.LEFT:
                    switch(state)
                    {
                        case MotorState.STOP:
                            pins.setPull(DigitalPin.P15, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P15, 0);
                            pins.setPull(DigitalPin.P14, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P14, 0);
                            break;
                    case MotorState.FOREWARD:
                            pins.setPull(DigitalPin.P15, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P15, 1);
                            pins.setPull(DigitalPin.P14, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P14, 0);
                            break;
                    case MotorState.BACKWARD:
                            pins.setPull(DigitalPin.P15, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P15, 0);
                            pins.setPull(DigitalPin.P14, PinPullMode.PullUp);
                            pins.digitalWritePin(DigitalPin.P14, 1);
                            break;               
                        default:
                        break;
                    }
                    break;
                default:
                break;
        }
    }

   //% blockId=mbit_CarCtrl block="设置小车状态为|%state"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    export function CarCtrl(state: CarState): void {
        switch(state)
        {
                case CarState.STOP:
                    //停止
                    MotorCtrl(MotorIndex.LEFT, MotorState.STOP);
                    MotorCtrl(MotorIndex.RIGHT, MotorState.STOP);
                    break;
                case CarState.FOREWARD:
                    //前行
                    MotorCtrl(MotorIndex.LEFT, MotorState.FOREWARD);
                    MotorCtrl(MotorIndex.RIGHT, MotorState.FOREWARD);
                    break;
                case CarState.LEFT_FOREWARD:
                    //左前行
                    MotorCtrl(MotorIndex.LEFT, MotorState.STOP);
                    MotorCtrl(MotorIndex.RIGHT, MotorState.FOREWARD);
                    break;
                case CarState.RIGHT_FOREWARD:
                   //右前行
                    MotorCtrl(MotorIndex.LEFT, MotorState.FOREWARD);
                    MotorCtrl(MotorIndex.RIGHT, MotorState.STOP);
                    break;
                case CarState.BACKWARD:
                    //后退
                    MotorCtrl(MotorIndex.LEFT, MotorState.BACKWARD);
                    MotorCtrl(MotorIndex.RIGHT, MotorState.BACKWARD);
                    break;
                case CarState.LEFT_FOREWARD:
                    //左后退
                    MotorCtrl(MotorIndex.LEFT, MotorState.STOP);
                    MotorCtrl(MotorIndex.RIGHT, MotorState.BACKWARD);
                    break;
                case CarState.RIGHT_FOREWARD:
                   //右后退
                    MotorCtrl(MotorIndex.LEFT, MotorState.BACKWARD);
                    MotorCtrl(MotorIndex.RIGHT, MotorState.STOP);
                    break;                               
                default:
                break;
        }
    }

    //% blockId=mbit_LedRGBCtrl block="设置彩灯 红色 |%redValue 绿色 |%greenValue 蓝色 |%blueValue"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    //% redValue.min=0 redValue.max=255
    //% greenValue.min=0 greenValue.max=255
    //% blueValue.min=0 blueValue.max=255
    export function LedRGBCtrl(redValue: number, greenValue: number, blueValue: number): void {
        led.enable(false);
        //red
        pins.analogWritePin(AnalogPin.P7, redValue * 1024 / 256);
        
        //green
        pins.analogWritePin(AnalogPin.P9, greenValue * 1024 / 256);

        //blue
        pins.analogWritePin(AnalogPin.P6, blueValue * 1024 / 256);
    }

    //% blockId=mbit_LineSensorChk block="检测到 |%index 寻迹传感器状态为 |%state"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function LineSensorChk(index: LineSensorIndex, state: LineState): boolean {

        let temp: boolean = false;

        switch (index) {
            case LineSensorIndex.LEFT: {
                if (lineSensorThrold > pins.analogReadPin(AnalogPin.P2)) {
                    if (state == LineState.WHITE) {
                        temp = true;
                    }
                }
                else {
                    if (state == LineState.BLACK) {
                        temp = true;
                        serial.writeNumber(lineSensorThrold);
                    }
                }
                break;
            }

            case LineSensorIndex.RIGHT: {
                if (lineSensorThrold > pins.analogReadPin(AnalogPin.P1)) {
                    if (state == LineState.WHITE) {
                        temp = true;
                    }
                }
                else {
                    if (state == LineState.BLACK) {
                        temp = true;
                    }
                }
                break;
            }
        }
        return temp;
    }

    //% blockId=mbit_LineSensorThreshold block="初始化寻迹传感器灵敏度（10-100） |%value"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    //% value.min=10 value.max=100
    export function mbit_LineSensorThreshold(value: number): void {
        lineSensorThrold = (100-value)*1024/100;
    }

    //% blockId=mbit_EdgeSensorChk block="|%index 边缘传感器检查到边缘"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function EdgeSensorChk(index: LineSensorIndex): boolean {
        switch (index) {
            case LineSensorIndex.LEFT: 
                if (edgeSensorThrold < pins.analogReadPin(AnalogPin.P2)) 
                {
                    return true;
                }
                return false;
            break;
            case LineSensorIndex.RIGHT:
                if (edgeSensorThrold < pins.analogReadPin(AnalogPin.P1)) 
                {
                    return true;
                }
                return false;
            break;
            default:
            break;
        }
        return false;
    }

    //% blockId=mbit_EdgeSensorThreshold block="初始化边缘传感器灵敏度（10-100） |%value"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    //% value.min=10 value.max=100
    export function mbit_EdgeSensorThreshold(value: number): void {
        edgeSensorThrold = (100-value)*1024/100;
    }
    
    //% blockId=mbit_LightSensorValueGet block="|%index 亮度传感器值(0-100)"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function LightSensorValueGet(index: LightSensorIndex): number {

        let temp: number = 0;

        switch (index) {
            case LightSensorIndex.LEFT: {
                temp = pins.analogReadPin(AnalogPin.P1);
                temp = temp * 100 /1024;
                break;
            }

            case LightSensorIndex.RIGHT: {
                temp = pins.analogReadPin(AnalogPin.P2);
                temp = temp * 100 /1024;
                break;
            }
        }
        return temp;
    }

    //% blockId=mbit_UltraSensorValueGet block="超声检测距离(cm)"
    //% color="#FF7F00"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function UltraSensorValueGet(): number {

        // send pulse   
        let list:Array<number> = [0, 0, 0, 0, 0];
        for (let i = 0; i < 5; i++) {
            pins.setPull(DigitalPin.P13, PinPullMode.PullNone);
		        pins.digitalWritePin(DigitalPin.P13, 0);
		        control.waitMicros(2);
		        pins.digitalWritePin(DigitalPin.P13, 1);
		        control.waitMicros(15);
		        pins.digitalWritePin(DigitalPin.P13, 0);
		
		        let d = pins.pulseIn(DigitalPin.P8, PulseValue.High, 43200);
		        list[i] = Math.floor(d / 40)
        }
        list.sort();
        let length = (list[1] + list[2] + list[3])/3;
        return  Math.floor(length);
    }

    //% blockId=mbit_MusicPlay block="播放音乐 |%index"
    //% weight=97
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Music_Car(index: MusicIndex): void {
        switch (index) {
            case MusicIndex.dadadum: music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once); break;
            case MusicIndex.birthday: music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once); break;
            case MusicIndex.entertainer: music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once); break;
            case MusicIndex.prelude: music.beginMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once); break;
            case MusicIndex.ode: music.beginMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once); break;
            case MusicIndex.nyan: music.beginMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once); break;
            case MusicIndex.ringtone: music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once); break;
            case MusicIndex.funk: music.beginMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once); break;
            case MusicIndex.blues: music.beginMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once); break;
            case MusicIndex.wedding: music.beginMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once); break;
            case MusicIndex.funereal: music.beginMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once); break;
            case MusicIndex.punchline: music.beginMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once); break;
            case MusicIndex.baddy: music.beginMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once); break;
            case MusicIndex.chase: music.beginMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once); break;
            case MusicIndex.ba_ding: music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once); break;
            case MusicIndex.wawawawaa: music.beginMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once); break;
            case MusicIndex.jump_up: music.beginMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once); break;
            case MusicIndex.jump_down: music.beginMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once); break;
            case MusicIndex.power_up: music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once); break;
            case MusicIndex.power_down: music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once); break;
        }
    }
}