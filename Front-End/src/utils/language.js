const locals = {
    'getStarted' : {
        "en" : "Get started",
        "ar" : "ابدأ هنا"
    },
    'getStarted2' : {
        "en" : "Get started2",
        "ar" : "ابد2أ هنا"
    },
    'getStarted' : {
        "en" : "Get started",
        "ar" : "ابدأ هنا"
    },

}


export function getLocalTranslate(key,lang) {
    // console.log(locals[key]);
    return lang == 'en' ? locals[key]["en"] : locals[key]["ar"];
}