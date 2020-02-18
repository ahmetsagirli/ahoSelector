var ahoSelector = {
    run: function(){
        $('select').each(function(){
            $(this).parent().find('.ahoselector').remove();
            ahoSelector.create($(this));
        });
    },
    refresh: function(t){
        var tmp = $(t);
        tmp.parent().find('.ahoselector').remove();
        ahoSelector.create( tmp );
        ahoSelector.positionControl(t);
    },
    selected: function(t, val){
        $(t).parent().find('.ahoselector .items .item').removeClass('active');
        $(t).parent().find('.ahoselector span').html( $(t).parent().find('.ahoselector .items .item[data-value='+val+']').html() );
        $(t).parent().find('.ahoselector .items .item[data-value='+val+']').addClass('active');
    },
    create: function(t){
        var options = [];
        $(t).find('option').each(function(){
            options.push({
                "name": $(this).html(),
                "disable": $(this).attr('disabled'),
                "value": $(this).attr('value')
            });
        });
        var temp = "";
        for(item in options){
            temp += '<div class="item" '+(options[item].disable ? options[item].disable : '') + (options[item].value ? ' data-value="' + options[item].value + '"' : '') +'>';
                temp += options[item].name;
            temp += '</div>';
        }
        $(t).hide();
        $(t).after('<div class="ahoselector"'+($(t).attr('name') ? ' id="' + $(t).attr('name') + '"' : '')+'><span></span><div class="items"><input type="text" placeholder="Aramak için..">' + temp + '</div></div>');
        $(t).parent().find('.ahoselector span').html( $(t).parent().find('.ahoselector .items .item:first').html() );
        $(t).parent().find('.ahoselector .items .item:first').addClass('active');

        ahoSelector.events( t.parent().find('.ahoselector') );
    },
    positionControl: function(t){
        $('.ahoselector').removeClass('active');
        if($(window).scrollTop() + $(t).offset().top + $(t).find('.items').outerHeight() + 50 <= $(window).height()){
            $(t).removeClass('up');
        }else{
            $(t).addClass('up');
        }
    },
    events: function(t){
        t.click(function(e){
            if (e.target.localName != "input") {
                if ($(this).hasClass('active')) {
                    $(this).find('input').val('');
                    $(this).find('.item').stop().show();
                    $(this).removeClass('active');
                }else{
                    $('.ahoselector').removeClass('active');
                    $(this).addClass('active');
                    $(this).find('input').focus();
                }
                $(t).find('input').on('keyup', function(){
                    var thhhh = $(this);
                    var keyword = ahoSelector.function.turkishToLower( $(thhhh).val() );
                    $(thhhh).parent().parent().find('.item').each(function(){
                        var th = $(this);
                        var e = ahoSelector.function.turkishToLower( $(th).html() );
                        if (e.indexOf(keyword) > -1) {
                           $(th).stop().show();
                        }else{
                            $(th).stop().hide();
                        }
                    });
                });
            }
        });
        t.find('.items .item').click(function(){
            if (!$(this).attr('disabled')) {
                var temp = $(this).html();
                t.find('span').html( temp );
                t.parent().find('select option').removeAttr('selected');
                t.parent().find('select option').each(function(){
                    if ($(this).html() == temp) {
                        $(this).attr('selected','selected');
                    }
                });

                t.parent().find('select').change();
                
                $(this).parent().parent().find('.item').removeClass('active');
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                }else{
                    $(this).addClass('active')
                }
            }
        });
        ahoSelector.positionControl(t);
        $(window).scroll(function(){
            ahoSelector.positionControl(t);
        });
        $(window).resize(function(){
            ahoSelector.positionControl(t);
        });
    },
    function: {
        turkishToLower: function(t){
            var string = t;
            var letters = { "İ": "i", "I": "ı", "Ş": "ş", "Ğ": "ğ", "Ü": "ü", "Ö": "ö", "Ç": "ç" };
            string = string.replace(/(([İIŞĞÜÇÖ]))/g, function(letter){ return letters[letter]; })
            return string.toLowerCase();
        }
    }
};