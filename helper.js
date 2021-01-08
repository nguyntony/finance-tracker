const layout = {
    partials: {
        header: '/partials/header',
        homeHeader: '/partials/homeHeader',
        // memberHeader: '/partials/memberHeader',
        footer: '/partials/footer',
    }
};

const partialContent = {
    header: '/partials/header',
    homeHeader: '/partials/homeHeader',
    // memberHeader: '/partials/memberHeader',
    footer: '/partials/footer',
}

const dashboardContent = {
    header: '/partials/header',
    // memberHeader: "/partials/memberHeader",
    footer: '/partials/footer',
    dashHeader: "/partials/dashboard/dashHeader",
    dashFooter: "/partials/dashboard/dashFooter",
    cards: '/partials/dashboard/cards'
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
    addDecimal,
    dashboardContent
};
