if (typeof Object.create !== 'function') {
    Object.create = function(obj) {
        var F = function() {};
        F.prototype = obj;
        return new F();
    };
}


(function($, window, document) {

    var GulfNews = {
        init: function(elm, options) {

            this.elm = elm;
            this.$elm = $(elm);
            this.options = $.extend({}, $.fn.gulfNews.deafults, options);

            this.$newsListUl = this.$elm.find('.news-list');

            this.loadFeedData();

        },

        loadFeedData: function() {
            var self = this;
            var selfOptions = self.options;

            $.ajax({
                type: 'GET',
                url: selfOptions.feedLoadUrl + encodeURIComponent(selfOptions.feedUrl),
                dataType: selfOptions.feedType
            }).done(function(d) {
                self.$newsListUl.html('');
                selfOptions.feedData = d;
                selfOptions.feedArray = d.responseData.feed.entries;
                self.buildNewsList();
                self.initViewMore();
                self.initNextUpdate();
            }).fail(function() {

                self.$newsListUl.html('');
                self.$newsListUl.html('<li>Error Loading news :(</li>');
            });
        },

        initNextUpdate: function() {
            var self = this;
            var selfOptions = self.options;

            setTimeout(function() {
                self.loadFeedData();
            }, selfOptions.updateInterval * 1000 * 60);

        },

        initViewMore: function() {
            var self = this;
            var selfOptions = self.options;

            self.$elm.find('.view-more').on('click', function() {
                selfOptions.curNewsIndex++;
                self.buildNewsList();
            });

        },

        buildNewsList: function() {
            var self = this;
            var selfOptions = self.options;

            var feedArray = selfOptions.feedArray;

            var curNewsStart = selfOptions.curNewsIndex * selfOptions.newsPerPage;
            var curNewsEnd = curNewsStart + selfOptions.newsPerPage;
            if (curNewsEnd > feedArray.length) {
                curNewsEnd = feedArray.length;
            }

            for (var i = curNewsStart; i < curNewsEnd; i++) {
                var news = feedArray[i];
                self.$newsListUl.append(self.getNewsHtml(news));
            }

            if (curNewsEnd === feedArray.length) {
                self.$elm.find('.view-more').hide();
                self.$newsListUl.find('li:last-child').addClass('last');
            } else {
                self.$elm.find('.view-more').show();
            }
        },

        getNewsHtml: function(news) {
            var self = this;
            var selfOptions = self.options;

            var $li = $('<li>');
            var $link = $('<a>').attr({
                "href": news.link,
                "target": selfOptions.newsLinkTarget,
                "class": "news-link"
            }).appendTo($li);

            $('<div>').attr({
                'class': 'news-title'
            }).html(news.title).appendTo($link);
            $('<div>').attr({
                'class': 'news-desc'
            }).html(news.content).appendTo($link);

            return $li;
        }
    };

    $.fn.gulfNews = function(options) {

        this.each(function() {
            var gulfNews = Object.create(GulfNews);
            gulfNews.init(this, options);
        });
    };

    $.fn.gulfNews.deafults = {
        feedLoadUrl: window.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=',
        feedUrl: 'http://gulfnews.com/cmlink/1.1287294',
        feedType: 'json',
        newsLinkTarget: '_blank',
        newsPerPage: 5,
        curNewsIndex: 0,
        updateInterval: 10 // in minutes
    };



}(jQuery, window, document));