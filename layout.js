const layout = {
    partials: {
        header: '/partials/header',
        homeHeader: '/partials/homeHeader',
        memberHeader: '/partials/memberHeader',
        footer: '/partials/footer',
    }
};

const partialContent = {
    header: '/partials/header',
    homeHeader: '/partials/homeHeader',
    memberHeader: '/partials/memberHeader',
    footer: '/partials/footer',
}

const msgContent = {
    flashMsg: '/partials/flashMsg'
}


const getMessages = (req) => {
    return {
        error: req.flash("error"),
        success: req.flash("success")
    }
}

const addDecimal = (num) => {
    return Number.parseFloat(num).toFixed(2)
}

module.exports = {
    layout,
    getMessages,
    partialContent,
    msgContent,
    addDecimal
};
