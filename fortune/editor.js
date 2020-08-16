var questionData = {
    "dataType": "questions",
    "data": {
        "author": "",
        "round1": [
            {
                "question": "",
                "source": "",
                "shortSource": "",
                "answers": [
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    }
                ]
            },
            {
                "question": "",
                "source": "",
                "shortSource": "",
                "answers": [
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    }
                ]
            },
            {
                "question": "",
                "source": "",
                "shortSource": "",
                "answers": [
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    }
                ]
            },
            {
                "question": "",
                "source": "",
                "shortSource": "",
                "answers": [
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    }
                ]
            },
            {
                "question": "",
                "source": "",
                "shortSource": "",
                "answers": [
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    }
                ]
            },
            {
                "question": "",
                "source": "",
                "shortSource": "",
                "answers": [
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    }
                ]
            }
        ],
        "round2": [
            {
                "question": "",
                "source": "",
                "shortSource": "",
                "answers": [
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    }
                ]
            },
            {
                "question": "",
                "source": "",
                "shortSource": "",
                "answers": [
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    }
                ]
            },
            {
                "question": "",
                "source": "",
                "shortSource": "",
                "answers": [
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    }
                ]
            },
            {
                "question": "",
                "source": "",
                "shortSource": "",
                "answers": [
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    }
                ]
            },
            {
                "question": "",
                "source": "",
                "shortSource": "",
                "answers": [
                    {
                        "answer": "",
                        "value": ""
                    },
                    {
                        "answer": "",
                        "value": ""
                    }
                ]
            }
        ]
    }
};

function getFormattedTime() {
    var today = new Date();
    var y = today.getFullYear();
    // JavaScript months are 0-based.
    var m = today.getMonth() + 1;
    var d = today.getDate();
    var h = today.getHours();
    var mi = today.getMinutes();
    var s = today.getSeconds();
    return y + "-" + m + "-" + d + "-" + h + "-" + mi + "-" + s;
};

function downloadObjectAsJson(exportObj, exportName){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  downloadAnchorNode.setAttribute("hidden", true);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

function downloadQuestionData() {
    var jsonName = "SecretFortune-" + questionData["data"]["author"] + "-" +getFormattedTime();
    downloadObjectAsJson(questionData, jsonName);
};

function loadQuestionData() {
    var files = document.getElementById('selectedFile').files;
    if (files.length <= 0) {
        return false;
    }

    var fr = new FileReader();

    fr.onload = function(e) {
        var result = JSON.parse(e.target.result);
        questionData = result;
        populateItems();
    }

    fr.readAsText(files.item(0));
};

$(document).ready(function(){
    $('.question').on('keyup change', function(){
        var questionText = $(this).val();
        var theParent = $(this).parent();
        var questionValues = [$(this).parent().data('round'), $(this).parent().data('question')];
        if (questionText == "") {
            $('ol[data-round=' + questionValues[0] + '] li[data-question=' + questionValues[1] + '] a').html("Untitled Question");
        } else {
            $('ol[data-round=' + questionValues[0] + '] li[data-question=' + questionValues[1] + '] a').html($(this).val());
        };
        questionData['data'][questionValues[0]][questionValues[1]]['question'] = questionText;
    });
    $('.longsource').on('keyup change', function(){
        var questionText = $(this).val();
        var theParent = $(this).parent();
        var questionValues = [$(this).parent().data('round'), $(this).parent().data('question')];
        questionData['data'][questionValues[0]][questionValues[1]]['source'] = questionText;
    });
    $('.shortsource').on('keyup change', function(){
        var questionText = $(this).val();
        var theParent = $(this).parent();
        var questionValues = [$(this).parent().data('round'), $(this).parent().data('question')];
        questionData['data'][questionValues[0]][questionValues[1]]['shortSource'] = questionText;
    });
    $('.answer').on('keyup change', function(){
        var questionText = $(this).val();
        var theParent = $(this).parent();
        var questionValues = [$(this).parent().data('round'), $(this).parent().data('question'), $(this).data('answer')];
        questionData['data'][questionValues[0]][questionValues[1]]['answers'][questionValues[2]]['answer'] = questionText;
    });
    $('.value').on('keyup change', function(){
        var questionText = $(this).val();
        var theParent = $(this).parent();
        var questionValues = [$(this).parent().data('round'), $(this).parent().data('question'), $(this).data('answer')];
        questionData['data'][questionValues[0]][questionValues[1]]['answers'][questionValues[2]]['value'] = questionText;
    });
    $('#authorname').on('keyup change', function(){
        var questionText = $(this).val();
        questionData['data']['author'] = questionText
    });
});

function populateItems() {
    $('.question').each(function(){
        var theParent = $(this).parent();
        var questionValues = [$(this).parent().data('round'), $(this).parent().data('question')];
        var questionText = questionData['data'][questionValues[0]][questionValues[1]]['question'];
        $(this).val(questionText);
        if (questionText == "") {
            $('ol[data-round=' + questionValues[0] + '] li[data-question=' + questionValues[1] + '] a').html("Untitled Question");
        } else {
            $('ol[data-round=' + questionValues[0] + '] li[data-question=' + questionValues[1] + '] a').html($(this).val());
        };
    });
    $('.longsource').each(function(){
        var theParent = $(this).parent();
        var questionValues = [$(this).parent().data('round'), $(this).parent().data('question')];
        var questionText = questionData['data'][questionValues[0]][questionValues[1]]['source'];
        $(this).val(questionText);
    });
    $('.shortsource').each(function(){
        var theParent = $(this).parent();
        var questionValues = [$(this).parent().data('round'), $(this).parent().data('question')];
        var questionText = questionData['data'][questionValues[0]][questionValues[1]]['shortSource'];
        $(this).val(questionText);
    });
    $('#authorname').val(questionData['data']['author']);
    $('.answer').each(function(){
        var theParent = $(this).parent();
        var questionValues = [$(this).parent().data('round'), $(this).parent().data('question'), $(this).data('answer')];
        var questionText = questionData['data'][questionValues[0]][questionValues[1]]['answers'][questionValues[2]]['answer'];
        $(this).val(questionText);
    });
    $('.value').each(function(){
        var theParent = $(this).parent();
        var questionValues = [$(this).parent().data('round'), $(this).parent().data('question'), $(this).data('answer')];
        var questionText = questionData['data'][questionValues[0]][questionValues[1]]['answers'][questionValues[2]]['value'];
        $(this).val(questionText);
    });
}
