const values = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

var wins = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var scores = [0,0];

var scorestemp = [0,0];

var master = gsap.timeline();

function valueHandler(game, set) {
    master.progress(1);
    if (set == 0 & wins[game] != 0) {
        let current = wins[game];
        wins[game] = 0;
        scoreHandler(game, 0, current);
    } else if (set != 0 & wins[game] == set) {
        let current = wins[game];
        wins[game] = 0;
        scoreHandler(game, 0, current);
    } else if (set != 0 & wins[game] != set) {
        let current = wins[game];
        wins[game] = set;
        scoreHandler(game, set, current);
    };
};

function scoreHandler(game, set, current) {
    scorestemp = [0,0];
    for (i = 0; i < wins.length; i++) {
        if (wins[i] > 0) {
            scorestemp[wins[i]-1] += values[i];
        };
    };
    let change = [scorestemp[0]-scores[0],scorestemp[1]-scores[1]]

    animationHandler(game, set, current, change);
};

function animationHandler(game, set, current, change) {
    master.add(box_out(game, current))
        .to({}, .25, {})
        .add(box_in(game, set))
        .to({}, .25, {})
        .add(playera_flop(change[0]))
        .add(playerb_flop(change[1]), '-=2')
        .call(function() {scores = scorestemp;})
        .call(function() {console.log(scores);});
};

function box_out(game, current) {
    var tl = gsap.timeline();
    if (current == 0) {
        var box = '#shared-' + (game + 1);
    } else if (current == 1) {
        var box = '#playera-' + (game + 1);
    } else if (current == 2) {
        var box = '#playerb-' + (game + 1);
    };
    tl.set(box, {background: '#111', delay: 0.25})
        .set(box, {background: '#eee', delay: 0.25})
        .set(box, {background: '#111', delay: 0.25});
    return tl
};

function box_in(game, set) {
    var tl = gsap.timeline();
    if (set == 0) {
        var box = '#shared-' + (game + 1);
    } else if (set == 1) {
        var box = '#playera-' + (game + 1);
    } else if (set == 2) {
        var box = '#playerb-' + (game + 1);
    };
    tl.set(box, {background: '#eee', delay: 0.25})
        .set(box, {background: '#111', delay: 0.25})
        .set(box, {background: '#eee', delay: 0.25});
    return tl
};

function playera_flop(change) {
    var tl = gsap.timeline();
    if (change > 0) {
        tl.call(function() {document.getElementById('playera-bottom').innerHTML = scorestemp[0];})
            .to('#playera-top',{top:'-90%',duration:1})
            .to('#playera-bottom',{top:'-5px', duration:1}, '-=1')
            .call(function() {document.getElementById('playera-top').innerHTML = scorestemp[0];})
            .set('#playera-top',{top:'-5px'})
            .set('#playera-bottom',{top:'90%'})
            .to('#playera-bar', {width: (scorestemp[0] * 5) + 'px', duration: 1});
    } else if (change < 0) {
        tl.call(function() {document.getElementById('playera-top').innerHTML = scorestemp[0];})
            .set('#playera-top',{top:'-90%'})
            .set('#playera-bottom',{top:'-5px'})
            .call(function() {document.getElementById('playera-bottom').innerHTML = scores[0];})
            .to('#playera-top',{top:'-5px',duration:1})
            .to('#playera-bottom',{top:'90%',duration:1}, '-=1')
            .to('#playera-bar', {width: (scorestemp[0] * 5) + 'px', duration: 1});
    } else {
        tl.to({}, 2, {});
    }
    return tl;
};

function playerb_flop(change) {
    var tl = gsap.timeline();
    if (change > 0) {
        tl.call(function() {document.getElementById('playerb-bottom').innerHTML = scorestemp[1];})
            .to('#playerb-top',{top:'-90%',duration:1})
            .to('#playerb-bottom',{top:'-5px', duration:1}, '-=1')
            .call(function() {document.getElementById('playerb-top').innerHTML = scorestemp[1];})
            .set('#playerb-top',{top:'-5px'})
            .set('#playerb-bottom',{top:'90%'})
            .to('#playerb-bar', {width: (scorestemp[1] * 5) + 'px', duration: 1});
    } else if (change < 0) {
        tl.call(function() {document.getElementById('playerb-top').innerHTML = scorestemp[1];})
            .set('#playerb-top',{top:'-90%'})
            .set('#playerb-bottom',{top:'-5px'})
            .call(function() {document.getElementById('playerb-bottom').innerHTML = scores[1];})
            .to('#playerb-top',{top:'-5px',duration:1})
            .to('#playerb-bottom',{top:'90%',duration:1}, '-=1')
            .to('#playerb-bar', {width: (scorestemp[1] * 5) + 'px', duration: 1});
    } else {
        tl.to({}, 2, {});
    }
    return tl;
};

function fullScale() {
    var targetScale = Math.min(
        window.innerHeight / 1080,
        window.innerWidth / 1920,
        1
    );
    $('body').css('transform', 'scale(' + targetScale + ')')
};

$(document).ready(fullScale);
$(window).on('resize', fullScale);
