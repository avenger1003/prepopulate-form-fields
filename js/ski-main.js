/*!
 * SKI MAIN JS
 *
 * @project   PRE POPULATE FORM FIELDS
 * @date      27/07/2014
 * @author    Sandeep Kumar Inamdar <sandeep.bly@gmail.com>
 * @licensor  Sandeep Kumar Inamdar
 * @site      http://sandeepthemaster.wordpress.com
 *
 */

(function() {

    var PREPOP = function(options) {
        var _this = this;
        this.editArray = [];
        this.getFormFields = function(options) {
            var defaults = {
                btnTrigger: 'btn-edit',
                tileWrapperCls: 'address-wrapper',
                groupCls: 'form-group',
                groupParentCls: 'bootstrap-select',
                referenceCls: 'adds',
                addClss: 'active active-blur'
            };

            var settings = $.extend(true, {}, defaults, options);
            $('.' + settings.btnTrigger).on('click', function(e) {
                e.preventDefault();
                _this.editArray = [];
                var $parent = $(this).parents('.' + settings.tileWrapperCls);
                $parent.find('span').addClass(settings.referenceCls);

                $parent.find('.' + settings.referenceCls).each(function() {
                    $(this).removeClass(settings.referenceCls);
                    var currentClass = $(this).attr('class');

                    if ($(this).data('val')) {
                        _this.editArray.push(currentClass + ':' + $(this).data('val'));
                    } else {
                        _this.editArray.push(currentClass + ':' + $(this).html());
                    }
                    var refineVal = $(this).text().replace(',', ' ');
                    refineVal = (refineVal) ? refineVal : $(this).data('hidden');


                    if (settings.btnTrigger === 'delete-link') {
                        // $('.' + settings.groupCls).find('#' + $(this).attr('class')).text($(this).text());
                        $('.modal-body').find('address').html($parent.find('.address-fields').html());
                    } else {
                        if ($(this).data('val') && $(this).data('val') !== 'Other') {
                            //$('#' + currentClass).selectpicker('val', $(this).data('val'));
                        } else if ($(this).data('val') && $(this).data('val') === 'Other') {
                            // $('#' + currentClass).selectpicker('val', $(this).data('val'));
                            $('.' + settings.groupCls).find('#othertitle').val($('.othertitle').data('val'));
                        } else {
                            $('.' + settings.groupCls).find('#' + $(this).attr('class')).val(refineVal);
                        }
                    }
                    $('#' + $(this).attr('class')).parents('.' + settings.groupCls).addClass(settings.addClss);
                });
            });
            // console.log(_this.setEditArray());
        };

        this.setEditArray = function() {
            return _this.editArray;
        };
        return this.getFormFields(options);
    };

    $.fn.prepform = function(options) {
        var prepform = new PREPOP(options);
    };

})($);