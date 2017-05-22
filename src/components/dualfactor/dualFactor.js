(function() {
    var DualFactor = {
        bind(el, binding, vnode) {
            var context = vnode.context,
                method = binding.arg,
                msg = el.getAttribute('dual-operation'),
                args = el.getAttribute('dual-args') ? JSON.parse(el.getAttribute('dual-args')) : null;
            // console.log(args)
            this.evt = (e) => {
                e.stopPropagation();
                e.preventDefault();
                context.$refs.dualFactor.$emit('dual-open',msg,e,function(){
                    context[method](args);
                });
                // context.$refs.dualFactor.$on('dual-close',() => {
                //     context[method](args)
                // });
                // context[method] && context[method].apply(context);
            }
            el.addEventListener('click',this.evt,false);
        }
    };

    // If support node / ES6 module
    if (typeof module === 'object' && module.exports) {
        module.exports = DualFactor;
    }
    // if using require js
    else if (typeof define === 'function' && define.amd) {
        define(function() {
            return DualFactor });
    }
    // if script loaded by script tag in HTML file
    else if (typeof window !== undefined) {
        return Vue.directive('dual-factor', DualFactor);
    }
})();
