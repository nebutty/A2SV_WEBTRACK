import 'cypress-wait-until';

describe('Bookmark functionality', () => {
  const email = 'nebat.hussen@a2sv.org';
  const password = '12345678';
  let jobId: string = '';

  beforeEach(() => {
    cy.request('POST', 'https://akil-backend.onrender.com/login', {
      email,
      password,
    }).then((res) => {
      const accessToken = res.body.data.accessToken; // ✅ matches API response
      expect(accessToken, 'Access token exists').to.exist;

      cy.wrap(accessToken).as('authToken'); // store token for later

      cy.visit('/dashboard', {
        onBeforeLoad(win) {
          win.localStorage.setItem('token', accessToken);
        },
      });

      cy.get('[data-cy="job-card"]', { timeout: 10000 }).should('exist');
    });
  });

  it('should bookmark a job and reflect in the backend', () => {
    cy.get('[data-cy="job-card"]').first().as('firstCard');

    cy.get('@firstCard')
      .invoke('attr', 'href')
      .then((href) => {
        jobId = href!.split('/').pop()!;
      });

    cy.get('@firstCard').find('[data-cy="bookmark-button"]').click();

    cy.wait(1000);

    cy.get('@authToken').then((token) => {
      cy.request({
        method: 'GET',
        url: 'https://akil-backend.onrender.com/bookmarks',
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        expect(res.status).to.eq(200);
        const bookmarkedIds = res.body.data.map((bm: any) => bm.eventID);
        expect(bookmarkedIds).to.include(jobId);
      });
    });
  });

it('should keep bookmark visible after reload', () => {
  cy.reload();

  // Wait until jobs are fetched and rendered
  cy.get('[data-cy="job-card"]', { timeout: 10000 }) // wait up to 10s
    .should('exist')
    .first()
    .find('[data-cy="bookmark-button"]')
    .find('svg')
    .should('exist');
});




it('should remove bookmark and confirm via backend', () => {
  cy.get('@authToken').then((token) => {
    // 1️⃣ First ensure we have a bookmarked job
    cy.request({
      method: 'GET',
      url: 'https://akil-backend.onrender.com/bookmarks',
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      expect(res.status).to.eq(200);

      const bookmarkedIds = res.body.data.map((bm: any) => bm.eventID);
      expect(bookmarkedIds.length, 'There should be at least 1 bookmarked job').to.be.greaterThan(0);

      jobId = bookmarkedIds[0]; // pick first bookmarked job

      // 2️⃣ Find and click its bookmark button in the UI
      cy.get(`[href$="${jobId}"]`).within(() => {
        cy.get('[data-cy="bookmark-button"]').click();
      });

      // 3️⃣ Wait until the backend confirms removal
      cy.waitUntil(
        () =>
          cy
            .request({
              method: 'GET',
              url: 'https://akil-backend.onrender.com/bookmarks',
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((checkRes) => {
              expect(checkRes.status).to.eq(200);
              const ids = checkRes.body.data.map((bm: any) => bm.eventID);
              return !ids.includes(jobId); // ✅ wait until removed
            }),
        {
          timeout: 10000, // give backend more time (10s)
          interval: 500,
          errorMsg: `Bookmark for jobId ${jobId} was not removed in time`,
        }
      );
    });
  });


});
});
