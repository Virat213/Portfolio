const navToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

const form = document.getElementById('contactForm');
const status = document.querySelector('.form-status');

if (form && status) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name')?.toString().trim() || 'there';
    status.textContent = `Thanks, ${name}. Your message is ready to be connected to Virat.`;
    form.reset();
  });
}

// Fetch and display users from user.json
async function loadUsers() {
  const container = document.getElementById('user-cards-container');
  if (!container) return;

  try {
    const response = await fetch('user.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();
    renderUsers(users, container);
  } catch (error) {
    console.error('Error fetching user.json:', error);
    // Fallback if local file protocol blocks fetch without a local server
    const fallbackUsers = [
      {
        id: 1,
        name: "Alex Mercer",
        role: "Lead Data Architect",
        email: "alex.mercer@example.com",
        location: "San Francisco, CA",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        bio: "Specializes in large-scale distributed pipelines, real-time analytics, and cloud data warehousing architectures.",
        skills: ["Python", "Apache Spark", "Snowflake", "Kafka", "AWS"]
      },
      {
        id: 2,
        name: "Sophia Chen",
        role: "Senior ML Engineer",
        email: "sophia.chen@example.com",
        location: "New York, NY",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
        bio: "Passionate about computer vision, NLP transformers, and deploying scalable machine learning models into production.",
        skills: ["PyTorch", "TensorFlow", "Scikit-Learn", "FastAPI", "Docker"]
      },
      {
        id: 3,
        name: "David Miller",
        role: "Agentic AI Developer",
        email: "david.miller@example.com",
        location: "London, UK",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        bio: "Building autonomous AI agents, tool-calling systems, and RAG architectures for intelligent enterprise applications.",
        skills: ["LangChain", "LangGraph", "Gemini API", "ChromaDB", "Python"]
      },
      {
        id: 4,
        name: "Elena Rostova",
        role: "Full Stack & UI Architect",
        email: "elena.rostova@example.com",
        location: "Berlin, Germany",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
        bio: "Crafting intuitive web interfaces, visual design systems, and responsive data applications with modern frontend stacks.",
        skills: ["JavaScript", "HTML5/CSS3", "React", "Node.js", "Design Systems"]
      },
      {
        id: 5,
        name: "Marcus Vance",
        role: "DevOps & Cloud Engineer",
        email: "marcus.vance@example.com",
        location: "Toronto, Canada",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
        bio: "Focusing on CI/CD automation, Kubernetes orchestrations, infrastructure as code, and cloud security monitoring.",
        skills: ["Kubernetes", "Terraform", "Docker", "GCP", "CI/CD"]
      }
    ];
    renderUsers(fallbackUsers, container);
  }
}

function renderUsers(users, container) {
  container.innerHTML = users.map(user => `
    <article class="user-card">
      <div class="user-header">
        <img src="${user.avatar}" alt="${user.name}" class="user-avatar" loading="lazy" />
        <div class="user-meta">
          <h3>${user.name}</h3>
          <p class="user-role">${user.role}</p>
          <div class="user-location">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>${user.location}</span>
          </div>
        </div>
      </div>
      <p class="user-bio">${user.bio}</p>
      <a href="mailto:${user.email}" class="user-email">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
        ${user.email}
      </a>
      <div class="tag-list compact">
        ${user.skills ? user.skills.map(skill => `<span>${skill}</span>`).join('') : ''}
      </div>
    </article>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const loadBtn = document.getElementById('loadUsersBtn');
  if (loadBtn) {
    loadBtn.addEventListener('click', loadUsers);
  }
  // Automatically fetch & render users on page load
  loadUsers();
});


