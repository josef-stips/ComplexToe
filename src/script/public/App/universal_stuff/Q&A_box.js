class QABOX {
    constructor(amount_of_entries, content_array, color_assignment, margin_assignment, close_dark_layer = true) {
        this.list = uni_answer_box_list;
        this.amount_of_entries = amount_of_entries;
        this.content = content_array;
        this.color_assignment = color_assignment;
        this.margin_assignment = margin_assignment;
        this.close_dark_layer = close_dark_layer;

        this.events();
    };

    events() {
        uniAnswerBox_closeBtn.removeEventListener('click', uniAnswerBox_closeBtn.ev);
        uniAnswerBox_closeBtn.addEventListener('click', uniAnswerBox_closeBtn.ev = () => {
            this.close();
        });
    };

    open() {
        this.generate(this.amount_of_entries, this.content, this.color_assignment, this.margin_assignment);
        DisplayPopUp_PopAnimation(uni_answer_box, 'flex', true);
    };

    generate(amount, content, color_assignment, margin_assignment) {
        this.list.textContent = '';

        for (let i = 0; i < amount; i++) {
            if (!content[i] || content[i].length === 0) {
                console.warn(`Content at index ${i} is empty or undefined.`);
                continue;
            };

            let item = document.createElement('li');

            // Process the content and apply styles to specified words or phrases
            let processedContent = this.processContent(content[i], color_assignment, margin_assignment);

            // Append the processed content to the list item
            item.appendChild(processedContent);
            this.list.append(item);
        };
    };

    processContent(text, color_assignment, margin_assignment) {
        let fragment = document.createDocumentFragment();

        // Regular expression to match words and phrases
        let regex = new RegExp(Object.keys(color_assignment).join('|'), 'gi');

        let lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
            // Append text before the match as is
            if (match.index > lastIndex) {
                fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
            };

            // Create a span for the matched word or phrase
            let span = document.createElement('span');
            span.textContent = match[0];

            // Apply color and margins
            let key = match[0];
            if (color_assignment[key]) {
                span.style.color = color_assignment[key];
            };

            if (margin_assignment[key]) {
                let margins = margin_assignment[key];
                span.style.marginTop = margins[0] + 'vh';
                span.style.marginRight = margins[1] + 'vw';
                span.style.marginBottom = margins[2] + 'vh';
                span.style.marginLeft = margins[3] + 'vw';
            };

            fragment.appendChild(span);
            lastIndex = regex.lastIndex;
        };

        // Append the remaining text after the last match
        if (lastIndex < text.length) {
            fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
        };

        return fragment;
    };

    close() {
        uni_answer_box.style.display = 'none';
        this.close_dark_layer && (DarkLayer.style.display = 'none');
    };
};