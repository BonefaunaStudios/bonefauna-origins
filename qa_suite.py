import subprocess
import time
from playwright.sync_api import sync_playwright

def run_qa():
    server = subprocess.Popen(['python3', '-m', 'http.server', '8088'])
    time.sleep(1)

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(record_video_dir="/home/jules/verification/videos")
            page = context.new_page()

            # Test 1: Mobile Viewports (360px, 390px, 412px)
            for width in [360, 390, 412]:
                page.set_viewport_size({"width": width, "height": 800})
                page.goto("http://localhost:8088/index.html")
                page.wait_for_timeout(400)

                # Open Hamburger Menu
                page.click("#menuToggle")
                page.wait_for_timeout(300)
                assert page.get_attribute("#menuToggle", "aria-expanded") == "true"
                assert page.is_visible("#siteNav.is-active")

                # Click link and verify menu closes
                page.click("#siteNav a[href='#work']")
                page.wait_for_timeout(300)
                assert page.get_attribute("#menuToggle", "aria-expanded") == "false"
                print(f"Mobile Navigation QA Passed at {width}px width!")

            # Test 2: Desktop Viewport (1280px)
            page.set_viewport_size({"width": 1280, "height": 900})
            page.goto("http://localhost:8088/index.html")
            page.wait_for_timeout(400)

            # Verify menu toggle is hidden on desktop
            assert not page.is_visible("#menuToggle")
            assert page.is_visible("#siteNav")
            print("Desktop Navigation QA Passed!")

            # Test 3: Origins Interactive Experience & Preservation
            page.goto("http://localhost:8088/origins.html")
            page.wait_for_timeout(500)
            assert "Origins" in page.title()

            # Hatch creature
            page.click("#startBtn")
            page.wait_for_timeout(2500)
            assert page.is_visible(".card")

            # Detail view navigation & sub-screens
            page.click("#archivesBtn")
            page.wait_for_timeout(400)
            assert page.is_visible(".completion-grid")

            page.click("#backBtn")
            page.wait_for_timeout(400)

            page.click("#loreBtn")
            page.wait_for_timeout(400)
            assert page.is_visible(".archive-list")

            page.click("#backBtn")
            page.wait_for_timeout(400)

            page.click("#achievementsBtn")
            page.wait_for_timeout(400)
            assert page.is_visible(".achievement-list")

            page.click("#backBtn")
            page.wait_for_timeout(400)

            # Return link to homepage
            page.click(".back-to-studio")
            page.wait_for_timeout(500)
            assert "Bonefauna Studios" in page.title()

            page.screenshot(path="/home/jules/verification/screenshots/verification.png")
            print("Origins Interactive QA & Path Resolution Passed!")

            context.close()
            browser.close()
    finally:
        server.kill()

if __name__ == "__main__":
    run_qa()
