var sDecor, secondEnt, decS, decis, textie;

var adcs = {
    length: function() {
      return Object.keys(this).length-1;
    },
    0: {
        name: 'revstr',
        description: 'Reverses the order of all the \
characters in the input.<br/>E. g.<br/>\
Input: <code>Hello!</code><br/>\
Output: <code>!olleH</code>',
        secondary: false
    },

    1: {
        name: 'revwrds',
        description: 'Reverse the order of the words \
in the input.<br/>E. g.<br/>\
Input: <code>hey buddy</code><br/>\
Output: <code>buddy hey</code>',
        secondary: false
    },

    2: {
        name: 'surtxt',
        description: 'Surround each word with a particular \
character or bit of text.<br/>E. g.<br/>\
Input: <code>Alpha beta, gamma!</code><br/>\
Decorator: <code>❤️</code><br/>\
Output: <code>❤️Alpha❤️ ❤️beta,❤️ ❤️gamma!❤️</code>',
        secondary: true,
        secondaryText: 'Type or select the decorator',
        secondaryBee: [
            '❤️', '∆', '🔥', '😊', '@', '#', '~'
        ],
        secondaryContentEditable: true
    },
    
    3: {
        name: 'instsaf',
        description: 'Transform text with \
line-breaks such that trailing line-breaks \
aren\'t removed by Instagram.<br/>',
        secondary: false
    },
    
    4: {
        name: 'revwrd',
        description: 'Reverses each word.<br/>E. g.<br/>\
Input: <code>Bagal Se Gujarelu</code><br/>\
Output: <code>lagaB eS ulerajuG</code>',
        secondary: false
    },
    
    5: {
        name: 'countwrds',
        description: 'Displays a pop-up with \
the number of words in the input.<br/>E. g.<br/>\
Input: <code>Alif Be Te</code><br/>\
Output: <code>Alif Be Te</code><br/>\
Popup: <code>3</code>',
        secondary: false
    },
    
    6: {
        name: 'capwrds',
        description: 'Capitalizes each word.<br/>E. g.<br/>\
Input: <code>ek bihari, sabpe bhari</code><br/>\
Output: <code>Ek Bihari, Sabpe Bhari</code>',
        secondary: false
    }, 
    
    7: {
        name: 'csfnt',
        description: 'Converts the text into the selected font.<br/>\
E. g.\
Input: <code>Wee Darling</code><br/>\
Selected font: <code>𝘐𝘵𝘢𝘭𝘪𝘤 𝟷</code><br/>\
Output: <code>𝘞𝘦𝘦 𝘋𝘢𝘳𝘭𝘪𝘯𝘨</code>',
        secondary: true,
        secondaryText: 'Select font',
        defaultVal: 0,
        secondaryContentEditable: false,
        secondaryBee: [
            '𝐁𝐨𝐥𝐝 𝟏','𝗕𝗼𝗹𝗱 2','𝘐𝘵𝘢𝘭𝘪𝘤 𝟷','𝑰𝒕𝒂𝒍𝒊𝒄 2','𝘽𝙤𝙡𝙙 𝙄𝙩𝙖𝙡𝙞𝙘'
        ]
    }
};

$(function() {
    window.decS = $("#decorSelect");
    window.textie = $("#textToDecorate");
    window.decis = $("#decorDescription");
    $("#decorSelectionMenu button").on("click", function() {
        if (window.sDecor)
            window.sDecor.removeClass("active");
        window.sDecor = $(this);
        window.sDecor.addClass("active");
        window.decS.text(window.sDecor.text());
        let numnum = parseInt(window.sDecor.val());
        window.decis.html(window.adcs[numnum].description);
        if (window.adcs[numnum].secondary) {
            if ($("#secondaryDrop").hasClass("d-none"))
                $("#secondaryDrop").removeClass("d-none");
            if (window.adcs[numnum].secondaryContentEditable)
                $("#secondaryParam").attr("contentEditable","true");
            else
                $("#secondaryParam").attr("contentEditable","false");
            $("#secondarySelectionMenu").empty();
            for (let i=0;i<window.adcs[numnum].secondaryBee.length;i++) {
                let x = $("<button></button>");
                x.text(window.adcs[numnum].secondaryBee[i]);
                x.attr({
                    type: 'button',
                    value: toString(i)
                });
                x.addClass("dropdown-item");
                $("#secondarySelectionMenu").append(x);
            }
            $("#secondarySelectionMenu button").on("click", function() {
                if (window.secondEnt)
                    window.secondEnt.removeClass("active");
                window.secondEnt = $(this);
                window.secondEnt.addClass("active");
                $("#secondaryParam").text(window.secondEnt.text());
            });
            if (window.adcs[numnum].defaultVal==undefined)
                $("#secondaryParam").text(window.adcs[numnum].secondaryText);
            else {
                window.secondEnt = $("#secondarySelectionMenu button").eq(window.adcs[numnum].defaultVal);
                window.secondEnt.addClass("active");
                $("#secondaryParam").text(window.secondEnt.text());
            }
        } else {
            if (!$("#secondaryDrop").hasClass("d-none"))
                $("#secondaryDrop").addClass("d-none");
            if (window.secondEnt)
                window.secondEnt = undefined;
        }
    });
    $("#clearButton").on("click",()=>{
        window.textie.val('');
        $('#toastie .toast-body span').text('Cleared!');
        $('#toastie').toast("show");
    });
    $("#ctcButton").on('click',function() {
        window.textie.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        $('#toastie .toast-body span').text('Selected!');
        $('#toastie').toast("show");
    });
    $("#generateButton").click(()=>{
        if (!window.sDecor) {
            $('#toastie .toast-body span').text('Select a decoration first!');
            $('#toastie').toast("show");
            return;
        }
        let v = window.textie.val();
        let e = window.sDecor.val();
        if (window.adcs[parseInt(window.sDecor.val())].secondary && $("#secondaryParam").text()=='') {
            $('#toastie .toast-body span').text('Incomplete input!');
            $('#toastie').toast("show");
            $("#secondaryParam").text('🥰');
            return;
        }
        if (!decorateIt(v,e,window.textie)) {
            $('#toastie .toast-body span').text('Error! Invalid decoration.');
            $('#toastie').toast("show");
        }
    });
});

const decorateIt = function(t,d,e) {
    d = parseInt(d);
    if (d>=window.adcs.length())
        return false;
    //Job
    switch (window.adcs[d].name) {
        case 'revstr':
            t = t.split('').reverse().join('');
            break;
        case 'revwrds':
            t = t.split(/\s/).reverse().join(' ');
            break;
        case 'surtxt': {
            let z = $("#secondaryParam").text();
            t = z+t.split(' ').join(z+' '+z)+z;
            }
            break;
        case 'instsaf':
            t = t.replace(/\n/gm,'\u2063\n')
            break;
        case 'revwrd': {
            let z = [];
            for (let i of t.split(/\s/))
                z.push(i.split('').reverse().join(''));
            t = z.join(' ');
            }
            break;
        case 'countwrds':
            $('#toastie .toast-body span').text('Word count: '+t.split(/\s/).length);
            $('#toastie').toast("show");
            return true;
            break;
        case 'capwrds': {
            let z = [];
            for (let i of t.split(/\s/))
                z.push(i.charAt(0).toUpperCase()+i.slice(1));
            t = z.join(' ');
            }
            break;
        case 'csfnt':
            t = customFont(t,window.secondEnt.text());
            break;
    }
    e.val(t);
     $('#toastie .toast-body span').text('Generated!');
     $('#toastie').toast("show");
    return true;
};

const f = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
fn = {
'𝐁𝐨𝐥𝐝 𝟏':['𝐚','𝐛','𝐜','𝐝','𝐞','𝐟','𝐠','𝐡','𝐢','𝐣','𝐤','𝐥','𝐦','𝐧','𝐨','𝐩','𝐪','𝐫','𝐬','𝐭','𝐮','𝐯','𝐰','𝐱','𝐲','𝐳','𝐀','𝐁','𝐂','𝐃','𝐄','𝐅','𝐆','𝐇','𝐈','𝐉','𝐊','𝐋','𝐌','𝐍','𝐎','𝐏','𝐐','𝐑','𝐒','𝐓','𝐔','𝐕','𝗪','𝐗','𝐘','𝐙','𝟎','𝟏','𝟐','𝟑','𝟒','𝟓','𝟔','𝟕','𝟖','𝟗'],
'𝗕𝗼𝗹𝗱 2':['𝗮','𝗯','𝗰','𝗱','𝗲','𝗳','𝗴','𝗵','𝗶','𝗷','𝗸','𝗹','𝗺','𝗻','𝗼','𝗽','𝗾','𝗿','𝘀','𝘁','𝘂','𝘃','𝘄','𝘅','𝘆','𝘇','𝗔','𝗕','𝗖','𝗗','𝗘','𝗙','𝗚','𝗛','𝗜','𝗝','𝗞','𝗟','𝗠','𝗡','𝗢','𝗣','𝗤','𝗥','𝗦','𝗧','𝗨','𝗩','𝗪','𝗫','𝗬','𝗭','0','1','2','3','4','5','6','7','8','9'],
'𝘐𝘵𝘢𝘭𝘪𝘤 𝟷':['𝘢','𝘣','𝘤','𝘥','𝘦','𝘧','𝘨','𝘩','𝘪','𝘫','𝘬','𝘭','𝘮','𝘯','𝘰','𝘱','𝘲','𝘳','𝘴','𝘵','𝘶','𝘷','𝘸','𝘹','𝘺','𝘻','𝘈','𝘉','𝘊','𝘋','𝘌','𝘍','𝘎','𝘏','𝘐','𝘑','𝘒','𝘓','𝘔','𝘕','𝘖','𝘗','𝘘','𝘙','𝘚','𝘛','𝘜','𝘝','𝘞','𝘟','𝘠','𝘡','𝟶','𝟷','𝟸','𝟹','𝟺','𝟻','𝟼','𝟽','𝟾','𝟿'],
'𝑰𝒕𝒂𝒍𝒊𝒄 2':['𝒂','𝒃','𝒄','𝒅','𝒆','𝒇','𝒈','𝒉','𝒊','𝒋','𝒌','𝒍','𝒎','𝒏','𝒐','𝒑','𝒒','𝒓','𝒔','𝒕','𝒖','𝒗','𝒘','𝒙','𝒚','𝒛','𝑨','𝑩','𝑪','𝑫','𝑬','𝑭','𝑮','𝑯','𝑰','𝑱','𝑲','𝑳','𝑴','𝑵','𝑶','𝑷','𝑸','𝑹','𝑺','𝑻','𝑼','𝑽','𝑾','𝑿','𝒀','𝒁','0','1','2','3','4','5','6','7','8','9'],
'𝘽𝙤𝙡𝙙 𝙄𝙩𝙖𝙡𝙞𝙘':['𝙖', '𝙗', '𝙘', '𝙙', '𝙚', '𝙛', '𝙜', '𝙝', '𝙞', '𝙟', '𝙠', '𝙡', '𝙢', '𝙣', '𝙤', '𝙥', '𝙦', '𝙧', '𝙨', '𝙩', '𝙪', '𝙫', '𝙬', '𝙭', '𝙮', '𝙯', '𝘼', '𝘽', '𝘾', '𝘿', '𝙀', '𝙁', '𝙂', '𝙃', '𝙄', '𝙅', '𝙆', '𝙇', '𝙈', '𝙉', '𝙊', '𝙋', '𝙌', '𝙍', '𝙎', '𝙏', '𝙐', '𝙑', '𝙒', '𝙓', '𝙔', '𝙕', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
};

const customFont = function(a,fnt) {
    let b = "";
    for (let i of a.split(''))
        if (f.indexOf(i)>=0)
            b += fn[fnt][f.indexOf(i)];
        else
            b += i;
    return b;
};