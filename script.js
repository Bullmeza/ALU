$(document).ready(function () {
    $('#box').on('input', calc);
    $('#box2').on('input', calc);
    $('#myonoffswitch:checked').on('input', calc);
});

function calc() {

    var box1DEC;
    var box2DEC;

    var box1 = $('#box').val();
    if (/[^0-1]/i.test(box1)) {
        box1DEC = box1;
        box1 = (box1 >>> 0).toString(2);
        document.getElementById("box_converted").innerHTML = "Binary: " + box1;
    } else {
        document.getElementById("box_converted").innerHTML = "Decimal: " + parseInt(box1, 2);
        box1DEC = parseInt(box1, 2);
    }

    var box2 = $('#box2').val();
    if (/[^0-1]/i.test(box2)) {
        box2DEC = box2;
        box2 = (box2 >>> 0).toString(2);
        document.getElementById("box2_converted").innerHTML = "Binary: " + box2;
    } else {
        document.getElementById("box2_converted").innerHTML = "Decimal: " + parseInt(box2, 2);
        box2DEC = parseInt(box2, 2);
    }
    // while (box1.length < box2.length) {
    //     var temp = box1;
    //     box1 = "";
    //     box1 += 0;
    //     box2 += temp;
    // }

    console.log(box1)
    console.log(box2)

    var bools1 = []
    for (var i = 0; i < box1.length; i++) {
        if (box1[i] == 1) {
            bools1.push(true);
        } else {
            bools1.push(false);
        }
    }
    var bools2 = []
    for (var i = 0; i < box2.length; i++) {
        if (box2[i] == 1) {
            bools2.push(true);
        } else {
            bools2.push(false);
        }
    }
    console.log(box1DEC);
    console.log(box2DEC);


    if ($('#myonoffswitch:checked').val() == "on") {
        document.getElementById("type").innerHTML = "+";
        var output = [];
        var cout = false;
        for (var i = 0; i < Math.max(bools1.length, bools2.length); i++) {
            var sum = Boolean(bools1[bools1.length - i - 1] ^ bools2[bools2.length - i - 1] ^ cout);
            cout = Boolean(bools1[bools1.length - i - 1] && bools2[bools2.length - i - 1]) + (cout && (bools1[bools1.length - i - 1] ^ bools2[bools2.length - i - 1]));
            output.push(sum);
        }
        output.push(cout);
        output = output.reverse();
        var output_raw = "";
        for (var i = 0; i < output.length; i++) {
            if (output[i] == 1) {
                output_raw += 1;
            }
            else {
                output_raw += 0;
            }
        }
        document.getElementById("output").innerHTML = output_raw + " = " + parseInt(output_raw, 2);
    }
    else {
        document.getElementById("type").innerHTML = "-";
        if (parseInt(box1DEC) < parseInt(box2DEC)) {



            var output = [];
            var bout = false;
            for (var i = 0; i < Math.max(bools1.length, bools2.length); i++) {
                var diff = Boolean(bools1[bools1.length - i - 1] ^ bools2[bools2.length - i - 1] ^ bout);
                bout = Boolean((!bools1[bools1.length - i - 1]) && bout) + (((!bools1[bools1.length - i - 1]) && (bools2[bools2.length - i - 1])) + (bools2[bools2.length - i - 1] && bout));
                output.push(diff);
            }
            // output.push(bout);
            output = output.reverse();
            var remove = false;
            var output_raw = "";
            for (var i = 0; i < output.length; i++) {
                if (output[i] == 1) {
                    output_raw += 1;
                    remove = true;
                }
                else {
                    if (remove) {
                        output_raw += 0;
                    }
                }
            }
            var dec = 0;
            dec -= Math.pow(2, output_raw.length - 1);
            for (var i = 1; i < output_raw.length; i++) {
                if (output_raw[i] == 1) {
                    dec += Math.pow(2, output_raw.length - 1 - i);
                    // console.log(Math.pow(2, output.length - 1 - i));
                }
            }
            document.getElementById("output").innerHTML = output_raw + " = (two's complement) " + dec;
        } else {
            var output = [];
            var bout = false;
            for (var i = 0; i < Math.max(bools1.length, bools2.length); i++) {
                var diff = Boolean(bools1[bools1.length - i - 1] ^ bools2[bools2.length - i - 1] ^ bout);
                bout = Boolean(!bools1[bools1.length - i - 1] && bout) + (!bools1[bools1.length - i - 1] && (bools2[bools2.length - i - 1]) + (bools2[bools2.length - i - 1] && bout));
                output.push(diff);
            }
            output.push(bout);
            output = output.reverse();
            var output_raw = "";
            for (var i = 0; i < output.length; i++) {
                if (output[i] == 1) {
                    output_raw += 1;
                }
                else {
                    output_raw += 0;
                }
            }

            document.getElementById("output").innerHTML = output_raw + " = " + parseInt(output_raw, 2);
        }
    }
}