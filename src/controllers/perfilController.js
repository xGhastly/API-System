exports.index = async (req, res) => {
    try {
        const criadoEm = req.session.user?.criadoEm;
        res.render('perfil', { criadoEm });
    } catch (e) {
        console.log(e);
        res.render('404');
    }
};