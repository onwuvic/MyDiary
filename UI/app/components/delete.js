(function () {
    app.addComponent({
        name: 'delete',
        model: {
            loading: true
        },
        view,
        controller
    });
  
    function view() {
        if(this.loading) return 'Deleting...';
    }
  
    function controller() {
        const id = router.params[0];
        this.loading = true;
    
        api.getOneDiaryByIdAndDelete(id)
            .then(data => {
                this.loading = false;
                if(data.status == 'error') {
                    console.log(data.message)
                } else {
                    window.location.replace('#/diary');
                }
            });
    }
  })();