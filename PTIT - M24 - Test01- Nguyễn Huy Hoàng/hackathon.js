"use strict";
class FeedBack {
    constructor(id, name, score) {
        this.id = id;
        this.name = name;
        this.score = score;
    }
}
class Feedbacks {
    constructor() {
        let saveFeedback = localStorage.getItem("listFeed");
        this.feedbacks = saveFeedback ? JSON.parse(saveFeedback) : [];
        this.renderFeedBack();
    }
    renderFeedBack() {
        let feedBackList = document.querySelector(".comment-bottom");
        feedBackList.innerHTML = "";
        this.feedbacks.forEach(feedBack => {
            const feedbackItem = document.createElement("div");
            feedbackItem.classList.add("comment");
            feedbackItem.innerHTML += `
                <div class="circle-total">${feedBack.score}</div>
                <div class="option">
                    <button style="color: red; border: none;" onclick="feedBackManager.updateFeedBack(${feedBack.id})"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button style="color: red; border: none;" onclick="feedBackManager.deleteFeedBack(${feedBack.id})"><i class="fa-solid fa-xmark"></i></button>
                </div>         
            `;
            const contentItem = document.createElement("div");
            contentItem.classList.add("content");
            contentItem.innerHTML = `<p>${feedBack.name}</p>`;
            feedBackList.appendChild(feedbackItem);
            feedBackList.appendChild(contentItem);
        });
    }
    createFeedBack(name, score) {
        const id = this.feedbacks.length > 0 ? this.feedbacks[this.feedbacks.length - 1].id + 1 : 1;
        const newFeedback = new FeedBack(id, name, score);
        this.feedbacks.push(newFeedback);
        this.saveToLocalStorage(); // Lưu vào localStorage
        this.renderFeedBack();
        window.location.reload();
    }
    updateFeedBack(id) {
        const feedbackToUpdate = this.feedbacks.find(feedback => feedback.id === id);
        if (!feedbackToUpdate) {
            console.error("Không tìm thấy phản hồi cần sửa.");
            return;
        }
        // Lưu trữ số cần sửa vào biến tạm thời
        selectedNumber = feedbackToUpdate.score;
        // Hiển thị dữ liệu của phản hồi vào các trường tương ứng
        inputField.value = feedbackToUpdate.name;
        changeColor.forEach((num) => num.style.backgroundColor = "");
        document.querySelectorAll(`.change-color[data-num="${selectedNumber}"]`).forEach((element) => {
            element.style.backgroundColor = "red";
        });
        sendFeedback.style.display = "none";
        saveFeedback.style.display = "block";
        saveFeedback.addEventListener("click", () => {
            const newName = inputField.value;
            const newScore = selectedNumber;
            // Cập nhật thông tin phản hồi
            feedbackToUpdate.name = newName;
            if (newScore) {
                feedbackToUpdate.score = newScore;
            }
            this.saveToLocalStorage();
            this.renderFeedBack();
            saveFeedback.style.display = "none";
            sendFeedback.style.display = "block";
            inputField.value = "";
            changeColor.forEach((num) => num.style.backgroundColor = "");
            window.location.reload();
        });
    }
    deleteFeedBack(id) {
        if (confirm("Bạn có chắc chắn muốn xóa phản hồi này không?")) {
            this.feedbacks = this.feedbacks.filter(feedback => feedback.id !== id);
            this.saveToLocalStorage(); // Lưu vào localStorage
            this.renderFeedBack();
            inputField.value = "";
            changeColor.forEach((num) => num.style.backgroundColor = "");
        }
    }
    saveToLocalStorage() {
        localStorage.setItem("listFeed", JSON.stringify(this.feedbacks));
    }
}
let feedBackManager = new Feedbacks();
let changeColor = document.querySelectorAll(".change-color");
changeColor.forEach((number) => {
    number.addEventListener("click", function () {
        changeColor.forEach((num) => num.style.backgroundColor = "");
        number.style.backgroundColor = "red";
        selectedNumber = parseInt(number.textContent || '0');
    });
});
let inputField = document.getElementById("comment");
let selectedNumber = null;
let sendFeedback = document.getElementById("send");
let saveFeedback = document.getElementById("save");
sendFeedback.addEventListener("click", (e) => {
    e.preventDefault();
    if (selectedNumber === null)
        return;
    let inputValue = inputField.value;
    // Kiểm tra xem giá trị được nhập vào có hợp lệ không
    if (!inputValue) {
        alert("Vui lòng nhập giá trị vào ô input trước khi gửi.");
        return;
    }
    const feedbackManager = new Feedbacks(); // Khởi tạo lại Feedbacks mỗi lần gửi feedback
    feedbackManager.createFeedBack(inputValue, selectedNumber);
    inputField.value = "";
    changeColor.forEach((num) => num.style.backgroundColor = "");
});
