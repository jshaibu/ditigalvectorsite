(function ($) {
    "use strict";

    function tcgelements_split_text($scope, $) {
        const splits = $scope.find('.tce-split-txt').get();
        if (splits.length > 0) {
            splits.forEach(div => {
                const text = div.textContent;
                div.innerHTML = '';
                for (let i = 0; i < text.length; i++) {
                    const span = document.createElement('span');
                    span.textContent = text[i];
                    div.appendChild(span);
                }
            });

            const spans = gsap.utils.toArray(".tce-split-txt span");
            let duration = $scope.find('.tce-split-txt').data('split-duration');

            let defaultColor = $scope.find('.tce-split-txt').data('split-color');
            let defaultFilter = $scope.find('.tce-split-txt').data('split-filter');
            let defaultTrigger = $scope.find('.tce-split-txt').parent();

            // Check for dark mode and the existence of dark mode attributes
            let color = $('body').hasClass('tcg-dark-mode') && $scope.find('.tce-split-txt').data('split-color-dark')
                ? $scope.find('.tce-split-txt').data('split-color-dark')
                : defaultColor;

            let filter = $('body').hasClass('tcg-dark-mode') && $scope.find('.tce-split-txt').data('split-filter-dark')
                ? $scope.find('.tce-split-txt').data('split-filter-dark')
                : defaultFilter;

            let trigger = $scope.find('.tce-split-txt').data('split-trigger')
                ? $($scope.find('.tce-split-txt').data('split-trigger'))
                : defaultTrigger


            let start = $scope.find('.tce-split-txt').data('split-start')
                ? $scope.find('.tce-split-txt').data('split-start')
                : "top 80%";

            let end = $scope.find('.tce-split-txt').data('split-end')
                ? $scope.find('.tce-split-txt').data('split-end')
                : "100%";

            spans.forEach((span, i) => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger,
                        start,
                        end,
                        scrub: true,
                    }
                });
                tl.to(span, {
                    color,
                    filter,
                    duration,
                    delay: i * 0.8,
                }).to(span, {
                    color: "transparent",
                    filter: "drop-shadow(0px 0px 30px rgba(255, 255, 255, 0))",
                    duration,
                });
            });
        }
    }

    // Initialize the script on both frontend and editor
    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/tcgelements-heading.default', tcgelements_split_text);
    });

})(jQuery);
