var BASE_URL = "https://hentainexus.com";

function getHome(page) {
    if (!page) page = 1;
    var response = Fetch.get(BASE_URL + "/?page=" + page);
    if (response.status === 200) {
        var doc = Html.parse(response.body);
        var listHtml = doc.select(".column .card"); 
        var listBook = [];
        
        for (var i = 0; i < listHtml.size(); i++) {
            var element = listHtml.get(i);
            listBook.push({
                name: element.select(".card-header-title a").text(),
                cover: element.select(".card-image img").attr("src"),
                link: element.select(".card-header-title a").attr("href"),
                host: BASE_URL
            });
        }
        return Response.success(listBook);
    }
    return Response.error("Lỗi kết nối trang chủ");
}

function search(keyword, page) {
    if (!page) page = 1;
    var response = Fetch.get(BASE_URL + "/search?q=" + encodeURIComponent(keyword) + "&page=" + page);
    if (response.status === 200) {
        var doc = Html.parse(response.body);
        var listHtml = doc.select(".column .card");
        var listBook = [];
        
        for (var i = 0; i < listHtml.size(); i++) {
            var element = listHtml.get(i);
            listBook.push({
                name: element.select(".card-header-title a").text(),
                cover: element.select(".card-image img").attr("src"),
                link: element.select(".card-header-title a").attr("href"),
                host: BASE_URL
            });
        }
        return Response.success(listBook);
    }
    return Response.error("Lỗi tìm kiếm truyện");
}

function getDetail(url) {
    var response = Fetch.get(url);
    if (response.status === 200) {
        var doc = Html.parse(response.body);
        var chapters = [];
        var readLink = doc.select("a.button.is-primary").attr("href");
        if (readLink) {
            chapters.push({
                name: "Chương 1 (Full)",
                link: readLink,
                host: BASE_URL
            });
        }
        return Response.success({
            name: doc.select("h1.title").text(),
            cover: doc.select(".image-container img").attr("src"),
            author: doc.select("table.table").text() || "Unknown",
            description: "Truyện tranh HentaiNexus",
            chapters: chapters
        });
    }
    return Response.error("Lỗi tải chi tiết truyện");
}

function getChap(url) {
    var response = Fetch.get(url);
    if (response.status === 200) {
        var images = [];
        var doc = Html.parse(response.body);
        var imgElements = doc.select(".reader-image img");
        
        for (var i = 0; i < imgElements.size(); i++) {
            var img = imgElements.get(i);
            var imgUrl = img.attr("data-src") || img.attr("src");
            if (imgUrl) images.push(imgUrl);
        }
        return Response.success(images);
    }
    return Response.error("Lỗi tải chương truyện");
}
