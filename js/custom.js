fetch("response.json")
    .then((res) => {
        return res.json();
    })
    .then((jsonData) => {

        writeCV(jsonData);
        // Personal Info
        document.querySelector('.value.nationality').textContent = jsonData.basics.nationality;
        document.querySelector('.value.nric').textContent = jsonData.basics.nric;
        document.querySelector('.value.age').textContent = jsonData.basics.age;
        document.querySelector('.value.gender').textContent = jsonData.basics.gender;
        document.querySelector('.value.maritalStatus').textContent = jsonData.basics.maritalStatus;
        document.querySelector('.value.dob').textContent = jsonData.basics.dob;

        document.querySelector('.value.phone').textContent = jsonData.basics.phone;
        document.querySelector('.value.email').textContent = jsonData.basics.email;
        document.querySelector('.value.linkedin').textContent = jsonData.basics.linkedinProfile;

        var addressLines = jsonData.basics.location.address.split('\n');
        var addressHTML = '';
        addressLines.forEach(function (line) {
            addressHTML += '<div class="line">' + line + '</div>';
        });
        document.querySelector('.value.address').innerHTML = addressHTML;

        document.querySelector('.person-name').textContent = jsonData.basics.name;

        // Summary
        document.querySelector('.s__content').textContent = jsonData.projects[0].description; // Assuming the first project description is the summary

        // Experience
        var experiencesContainer = document.querySelector('.__experiences');
        jsonData.work.forEach(function (experience) {
            var experienceHTML = `
    <div class="__experience">
        <div class="flex-item">
            <div class="left_item">
                <div class="company_name">${experience.name}</div>
                <div class="position">${experience.position}</div>
            </div>
            <div class="right_items">
                <div class="r_item _date_from">${experience.startDate}</div>
                <div class="r_item _seperator">-</div>
                <div class="r_item _date_to">${experience.endDate}</div>
                <div class="r_item _duration">(Calculations needed)</div>
            </div>
        </div>
        <div class="highlights">
            <ul class="list">
                ${experience.highlights.map(function (highlight) {
                return `<li>${highlight}</li>`;
            }).join('')}
            </ul>
        </div>
    </div>
`;
            experiencesContainer.innerHTML += experienceHTML;
        });

        // Education
        var educationContainer = document.querySelector('.education_degrees');
        jsonData.education.forEach(function (education) {
            var educationHTML = `
    <div class="ed_degree">
        <div class="ed_detail">
            <b class="university_name">${education.institution}</b>
            <div class="degree_">
                <div class="field_">${education.area}</div>
                <div class="_separator">|</div>
                <div class="cgpa">${education.score}</div>
            </div>
        </div>
        <div class="ed_duration">
            <b class="from">${education.startDate}</b>
            <div class="b_separtor">-</div>
            <b class="to">${education.endDate}</b>
        </div>
    </div>
`;
            educationContainer.innerHTML += educationHTML;
        });

        // Skills
        document.querySelector('.all_skils').textContent = jsonData.skills.map(function (skill) {
            return skill.name;
        }).join(', ');

        // Job Preferences
        document.querySelector('.availability_date').textContent = jsonData.jobPreferences.dateOfAvailability;
        document.querySelector('.previous_salary').textContent = jsonData.jobPreferences.previousSalary;
        document.querySelector('.expected_salary').textContent = jsonData.jobPreferences.expectedSalary;

        // Referees
        var refereesContainer = document.querySelector('.refrees_list');
        jsonData.references.forEach(function (reference) {
            var referenceHTML = `
    <div class="referee">
        <div class="name">${reference.name}</div>
        <div class="designation">${reference.position}</div>
        <div class="company_at">${reference.companyName}</div>
        <div class="company_loc">${reference.companyAddress}</div>
        <div class="contact_addresses">
            <div class="_num">${reference.officeNumber}</div>
            <div class="_num">${reference.mobileNumber}</div>
        </div>
    </div>
`;
            refereesContainer.innerHTML += referenceHTML;
        });



    });


function writeCV(resp) {
    if ('basics' in resp) {
        insertBasics();
    }
}
