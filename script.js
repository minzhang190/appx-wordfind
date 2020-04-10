document.title = title;
document.getElementById('h1').innerText = title;

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

var wordText = Object.keys(words);

var soundCount = 0;

function recreate() {
    wordText = Object.keys(words);
    shuffleArray(wordText);
    if (maxWordsPerGrid > 0) {
        wordText.splice(maxWordsPerGrid);
    }

    $('#puzzle').children().remove();
    $('#words li').remove();

    wordText.forEach(function(word) {
        var wordInfo = words[word];
        var $li = wordInfo['element'] = $('<li><img class="word"></li>');
        $li.find('img')
            .attr('src', prefix + wordInfo.image)
            .attr('title', word.toUpperCase())
            .data('info', wordInfo);
        $('#words').append($li);
    });

    try {
        var game = new WordFindGame('#puzzle', options);

        wordfind.print(game);

        $('#solve').off('click').click(() => game.solve());
    } catch (error) {
        console.log(error);
        location.reload();
    }
}

function handleLoad() {
    if (++soundCount < wordText.length) {
        return;
    }

    recreate();
    $('#create-grid').click(recreate);
}

createjs.Sound.addEventListener("fileload", handleLoad);

wordText.forEach(function(word) {
    var wordInfo = words[word];
    createjs.Sound.registerSound(prefix + wordInfo.sound, word);
});
