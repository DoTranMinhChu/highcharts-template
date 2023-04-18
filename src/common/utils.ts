
export class Utils {
    static randomNumbersBySum(sum: number, size: number, max?: number, min?: number) {
        const numbers = []
        do {
            const randomNumber = +(Math.random() * sum).toFixed(2)
            if (typeof max == "number" && randomNumber > max) continue;
            if (typeof min == "number" && randomNumber < min) continue;
            sum -= randomNumber < 0 ? 0 : randomNumber
            numbers.push(randomNumber < 0 ? 0 : randomNumber)
        } while (numbers.length < size - 1)
        numbers.push(+sum.toFixed(2))
        return numbers;
    }
    static getListTime(startTime: string = "9:15", endTime: string = "11:30") {
        const list: string[] = []
        const [hourStart, minusStart] = startTime.split(/[:]/);
        const [hourEnd, minusEnd] = endTime.split(/[:]/);
        for (let i = +hourStart; i <= +hourEnd; i++) {
            let start = 0;
            let end = 59;
            if (i == +hourStart) start = +minusStart
            if (i == +hourEnd) end = +minusEnd
            for (let j = start; j <= +end; j++) {
                list.push(`${i}:${j}`)
            }
        }
        return list
    }
    static random(min: number, max: number) {
        return Math.random() * (max - min) + min
    }

    static randoms(size: number, scale: number, max?: number, min?: number) {
        const numbers = []
        do {
            const randomNumber = Math.floor(+(0.5 - Math.random()).toFixed(4) * scale);
            if (typeof max == "number" && randomNumber > max) continue;
            if (typeof min == "number" && randomNumber < min) continue;
            numbers.push(randomNumber)
        } while (numbers.length < size)
        return numbers;
    }

    static getDaysArray(start: Date, end: Date) {
        for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
            arr.push(new Date(dt));
        }
        return arr;
    };

    static MA(data: number[], size: number): number[] {
        const length = data.length

        if (!size) {
            return [data.reduce((a, b) => a + b) / length]
        }

        if (size <= 1) {
            return data.slice()
        }

        if (size > length) {
            return Array(length)
        }

        const prepare = size - 1
        const ret = []
        let sum = 0
        let i = 0
        let counter = 0
        let datum

        for (; i < length && counter < prepare; i++) {
            datum = data[i]

            if (this.isNumber(datum)) {
                sum += datum
                counter++
            }
        }

        for (; i < length; i++) {
            datum = data[i]

            if (this.isNumber(datum)) {
                sum += datum
            }

            if (this.isNumber(data[i - size])) {
                sum -= data[i - size]
            }

            ret[i] = sum / size
        }

        return ret
    }

    static isNumber(value: any) {
        return typeof value === 'number' && value === value

    }

    static randomColor() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    static invertColor(hex: string) {
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            throw new Error('Invalid HEX color.');
        }
        // invert color components
        var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
            g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
            b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
        // pad each with zeros and return
        return '#' + this.padZero(r) + this.padZero(g) + this.padZero(b);
    }
    static padZero(str: string, len?: number) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }

    static getListsDataPerDate(startDate: number, endDate: number, gapTime: number, startData: number = this.random(0.1, 0.2) * 100) {
        const datas = [];
        let percent = this.random(-0.07, 0.07)
        for (let i = startDate; i <= endDate; i += gapTime) {
            datas.push([i, startData]);
            percent = this.random(-0.07, 0.07);
            startData *= 1 + percent
        }

        return datas;
    }
}