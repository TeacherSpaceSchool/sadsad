$(document).ready(function(){
    $('.toggle-filter > a').on('click',function (e) {
        e.preventDefault();
        $('.toggle-filter').toggleClass('open');
    })
//Календарь - в шапке
    pickmeup.defaults.locales['ru'] = {
        days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    };


    pickmeup('.datepicker', {
        flat      : true,
        date      : new Date,
        mode      : 'range',
        calendars : 1,
        format: "d.m.Y",
        title_format: "B Y",
        separator: '-',
        min : new Date(),
        select_month :false,
        select_year  : true,
        locale : 'ru',
        prev: "",
        next: "",
        hide_on_select: !0,
    });

    $('.datepicker').on('pickmeup-change',(e)=>{
        $('.icheck input').iCheck('uncheck');
        window.pickDates = pickmeup('.datepicker').get_date(true);
    });

    let today = new Date();
    let monday = new Date();
    let tuesday = new Date();
    let wednesday = new Date();
    let thursday = new Date();
    let friday = new Date();
    let saturday = new Date();
    let sunday = new Date();

    let nextmonday = new Date();
    let nexttuesday = new Date();
    let nextwednesday = new Date();
    let nextthursday = new Date();
    let nextfriday = new Date();
    let nextsaturday = new Date();
    let nextsunday = new Date();


    monday.setDate(today.getDate() + 1 - today.getDay());
    tuesday.setDate(today.getDate() + 2 - today.getDay());
    wednesday.setDate(today.getDate() + 3 - today.getDay());
    thursday.setDate(today.getDate() + 4 - today.getDay());
    friday.setDate(today.getDate() + 5 - today.getDay());
    saturday.setDate(today.getDate() + 6 - today.getDay());
    sunday.setDate(today.getDate() + 7 - today.getDay());

    nextmonday.setDate(today.getDate() + 7 + 1 - today.getDay() );
    nexttuesday.setDate(nextmonday.getDate() + 1);
    nextwednesday.setDate(nextmonday.getDate() + 2);
    nextthursday.setDate(nextmonday.getDate() + 3);
    nextfriday.setDate(nextmonday.getDate() +4);
    nextsaturday.setDate(nextmonday.getDate() +5);
    nextsunday.setDate(nextmonday.getDate() +6);

    //Чекбоксы под календарем
    $('.icheck input').iCheck({
        checkboxClass: 'icheckbox_flat-orange check',
        radioClass: 'iradio_flat-orange check'
    }).on('ifChecked',
        (e)=>{
        let idCheckbox = e.target.id;
        if(idCheckbox === 'week'){
            pickmeup('.datepicker').set_date([monday,tuesday,wednesday,thursday,friday,saturday,sunday]);
            window.pickDates = pickmeup('.datepicker').get_date(true);
            $('.icheck input:not(input[id='+idCheckbox+'])').iCheck('indeterminate');
        }
        if(idCheckbox === 'weekend'){
            pickmeup('.datepicker').set_date([saturday,sunday]);
            window.pickDates = pickmeup('.datepicker').get_date(true);
            $('.icheck input:not(input[id='+idCheckbox+'])').iCheck('indeterminate');
        }
        if(idCheckbox === 'nextWeek'){
            pickmeup('.datepicker').set_date([nextmonday,nexttuesday,nextwednesday,nextthursday,nextfriday,nextsaturday,nextsunday]);
            window.pickDates = pickmeup('.datepicker').get_date(true);
            $('.icheck input:not(input[id='+idCheckbox+'])').iCheck('indeterminate');
        }


    }).on('ifUnchecked',(e)=>{
        let idCheckbox = e.target.id;

        if(idCheckbox === 'week' || idCheckbox === 'weekend' || idCheckbox === 'nextWeek'){
            pickmeup('.datepicker').clear();
        }
    });

    //Кнопка ("Сбросить все") под календарем
    $('.reset-button').on('click',(e)=>{
        pickmeup('.datepicker').clear();
        $('.icheck input').iCheck('uncheck');
    })

//!-Календарь - в шапке

    //Слайдер с банерами над и под карточками событий
    $('.baner-slider').owlCarousel({
        center: false,
        items:1,
        loop:true,
        nav : false,
        dots : false,
        responsive:{
            600:{
                items:1
            }
        }
    });

    //Cлайдер на главной
    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
    var slidesPerPage = 6; //globaly define number of elements per page
    var syncedSecondary = true;

    sync1.on('initialized.owl.carousel',(e)=>{
        if(e.relatedTarget._width <= 992){
            sync1.find('.active').find('.item_info-block').addClass('show');
        }
        sync1.find('.center').find('.item_info-block').addClass('show');
    })
        .owlCarousel({
        items : 1,
        slideSpeed : 5000,
        center : true,
        nav: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        autoWidth : true,
        dots: true,
        loop: true,
        margin : 10,
        responsiveRefreshRate : 200,
        navText: '',
        responsive:{
            0 : {
                items : 1,
                center : false,
                autoWidth : false,
                margin : 0,
                nav : false,
            },
            992:{
                items:1,
            }

        }
    })
        .on('changed.owl.carousel', syncPosition)
        .on('translated.owl.carousel',(e)=>{
        sync1.find('.item_info-block').removeClass('show');
        sync1.find('.center').find('.item_info-block').addClass('show');
        if(e.relatedTarget._width <= 992){
            sync1.find('.active').find('.item_info-block').addClass('show');
        }
    })
        .on('resize.owl.carousel',(e)=>{
        console.log('resize', e.relatedTarget._width);
    });

    sync2
        .on('initialized.owl.carousel', function () {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items : slidesPerPage,
            dots: false,
            nav: false,
            smartSpeed: 200,
            slideSpeed : 500,
            slideBy: slidesPerPage,
            responsiveRefreshRate : 100
        })
        .on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        var count = el.item.count-1;
        var current = Math.round(el.item.index - (el.item.count/2) - .5);

        if(current < 0) {
            current = count;
        }
        if(current > count) {
            current = 0;
        }

        //end block

        sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();

        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if(syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function(e){
        // e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });





//Кнопка меню на мобиле
    $('.toggle-menu-btn').on('click',function(){
        $(this).toggleClass('toggle-menu-btn_active');
        $('.mobile-menu-wrap').toggleClass('mobile-menu-wrap_active');
        $('body').toggleClass('menu-open');
    })
//Выбор города на мобиле
    $('.header-menu_current').on('click',function(){
        $('.mobile-menu-header_menu').toggleClass('open');
    })
//Кнопка поиска
    $('#searchBtn').on('click',function () {
        $('.search-btn-wrap').toggleClass('open');
        $('body').toggleClass('menu-open');
    })
//Кнопка закрытия модалки внутри поиска
    $('.close-search-btn').on('click',()=>{
        $('.search-btn-wrap').removeClass('open');
        $('body').removeClass('menu-open');
    });

    $('#dateFrom').on('input',(e)=>{
        $('#dateFrom').addClass('full');
    })
    $('#dateTo').on('input',(e)=>{
        $('#dateTo').addClass('full');
    })









































///личный кабинет мои заказы
    $('.ticket-header').on('click',function(e){
        $(this).parent().toggleClass('open');
    });

//Страница покупки билета

    //sidebar
    //на странице buy.html
    // let sidebar = $('#fixed-sidebar'),
    //     topOfSidebar = sidebar ? $(sidebar).offset().top : 0;

    // $(window).on('scroll',()=>{
    //     let windowScroll = $(window).scrollTop();
    //     if (windowScroll >= topOfSidebar){
    //         $(sidebar).addClass('sticky');
    //     }
    //     else{
    //         $(sidebar).removeClass('sticky');
    //     }
    // });
    //!-sidebar

// +/- на странице покупки билета
    let wrap = $('.order-first-stage .stage-sector'),
        amountMinus = $('.amount-minus',wrap),
        amountPlus  = $('.amount-plus',wrap);

    amountMinus.on('click',(e)=>{
        let amountView = $(e.target).next();
        counter('minus',amountView);
    });
    amountPlus.on('click',(e)=>{
        let amountView = $(e.target).prev();
        counter('plus',amountView);
    });


    function counter(type,amView){
        let count = +amView.text(),
            name = $(amView.parent().parent().find('.person')).text(),
            info = $('.info-line');

        if(type === 'minus'){
            if(count <= 0){return}
            count--;
        }
        if(type === 'plus'){
            count++;
        }
        amView.text(count).attr('data-count',count);
    }


//tooltip на svg на транице покупки билета
    let tooltip = $('.ticket-available-tooltip');
    $('.all-sectors').on('mousemove',function (e) {
        if (e.target.tagName == 'path' || e.target.tagName == 'rect'){

           let available = $(e.target).parent('.section-block').attr('data-value');
            $(tooltip).addClass('show').text('Осталось билетов: ' + available).css({'left' : (e.offsetX - 60) +'px' , 'top' : (e.offsetY -20) + 'px'})
        }
        else {
            $(tooltip).removeClass('show');
        }
    })


//стрелка вверх
    $('.arrow-top').on('click',()=>{
        $('html, body').animate({scrollTop: 0},500);
    });
    let arrow  = $('.arrow-top');
    $(window).on('scroll',function () {
        if($(window).scrollTop() >=1500){
            $(arrow).addClass('show');
        }
        else{
            $(arrow).removeClass('show');

        }
    })

////Страница кино

//Галерея
    $('[data-fancybox="gallery"]').fancybox({
        buttons : [],
    });

    $('.film-detail_description > span').on('click',()=>{
        $('.film-detail_description > p').toggleClass('active');
    })

//Календарь - страница kino-detail
    pickmeup('.kino-datepicker', {
        flat      : true,
        date      : new Date,
        mode      : 'single',
        calendars : 1,
        format: "d.m.Y",
        title_format: "B Y",
        separator: '-',
        min : new Date(),
        select_month :false,
        select_year  : false,
        locale : 'ru',
        prev: "",
        next: "",
        hide_on_select: true,
    });
    $('.kino-datepicker').on('pickmeup-change', function (e) {
        $('.date','.date-control').text(e.detail.formatted_date);
        $('.controls','.date-control').removeClass('open');
        $('.day-item').removeClass('active');
        $('.day-item.js-day').addClass('active');
    })

//Кнопки дат страница kino-detail
    $('.js-day-item','.schedule_days-list').on('click',function (e) {
        e.preventDefault();
        $('.js-day-item , .js-day').removeClass('active');
        $('.date','.js-day').text('Выбрать день');
        $(this).addClass('active');
    });
//Кнопки календаря страница kino-detail
    $('.js-day','.schedule_days-list').on('click',function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.controls', this).toggleClass('open');
    });



//Линия выбора времени страница kino-detail
    $(".js-range-slider").ionRangeSlider({
        type: "double",
        values: ["10:00", "12:00", "14:00", "20:00", "02:00"],
        from: 0,
        to: 7,
        to_value: 0,
        min_interval: 1,
        grid: true,
        skin: "big",
        onChange : (data) =>{
            console.log('from---',data.from_value);
            console.log('to---',data.to_value);
        }
    });
//Выбор времени сеанса страница kino-detail
    $('input[type="radio"]', '.cinema-row').on('change',function (e) {
        let idVal = $(this).attr('id');
        $('label[for='+ idVal +']').addClass('loading');
        setTimeout(()=>{
            $('label[for='+ idVal +']').removeClass('loading');
            $('.schem-container').fadeOut();
            console.log($(this).parent().parent().parent().parent().parent().next().fadeIn());
            $(this).parent().parent().parent().parent().parent().addClass('white');
        },500);
    })
//Кнопки карта/список страница kino-detail
    $('.view-type > input[type="radio"]').on('click',(e)=>{
        let btn = e.target.value;
        if(btn === 'map'){
            $('.map').addClass('open');
        }
        if(btn === 'list'){
            $('.map').removeClass('open');
        }
    })
//Кнопка заказа билета страница kino-detail
    $('.order-btn').on('click',(e)=>{
        e.preventDefault();
        $('.change-place').css({display : 'none'});
        $('.order-form').css({display : 'block'});
    })
//Кнопка назад на выбор мест kino-detail
    $('.back-to-schem').on('click',()=>{
        $('.back-to-schem').parent().parent().parent().parent().parent().parent().css({display : 'none'});
        // $('.order-form').css({display : 'none'});
        $('.change-place').css({display : 'block'});
    })
//!-Страница кино

    window.pickDates = []

});
