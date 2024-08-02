// everything about the universal Q&A box for question btn's
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
        this.list.textContent = null;

        for (let i = 0; i < amount; i++) {
            let item = document.createElement('li');

            // Extract the key and rest of the content
            let key = content[i][0];
            let restContent = content[i].substring(1);

            // Create span for the colored key
            let coloredKey = document.createElement('span');
            coloredKey.textContent = key;
            coloredKey.style.color = color_assignment[key];

            // Apply margin styles to the span
            let margins = margin_assignment[key];
            coloredKey.style.marginTop = margins[0] + 'vh';
            coloredKey.style.marginRight = margins[1] + 'vw';
            coloredKey.style.marginBottom = margins[2] + 'vh';
            coloredKey.style.marginLeft = margins[3] + 'vw';

            // Add the colored key and the rest of the content to the list item
            item.appendChild(coloredKey);
            item.append(restContent);

            this.list.append(item);
        };
    };

    close() {
        uni_answer_box.style.display = 'none';
        this.close_dark_layer && (DarkLayer.style.display = 'none');
    };
};