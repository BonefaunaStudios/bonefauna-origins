import subprocess
import time
import sys
import traceback
from playwright.sync_api import sync_playwright

def run_qa():
    console_errors = []
    tests_passed = []
    tests_failed = []

    server = subprocess.Popen(['python3', '-m', 'http.server', '8088'])
    time.sleep(1)

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context()
            page = context.new_page()

            # Attach console error listener
            page.on("console", lambda msg: console_errors.append(f"CONSOLE {msg.type.upper()}: {msg.text}") if msg.type == "error" else None)
            page.on("pageerror", lambda err: console_errors.append(f"PAGE ERROR: {err}"))

            # Test 1: Mobile Navigation (360px, 390px, 412px)
            for width in [360, 390, 412]:
                test_name = f"Mobile Navigation at {width}px"
                try:
                    page.set_viewport_size({"width": width, "height": 800})
                    page.goto("http://localhost:8088/index.html")
                    page.wait_for_timeout(300)

                    # Open Hamburger Menu
                    page.click("#menuToggle")
                    page.wait_for_timeout(200)
                    assert page.get_attribute("#menuToggle", "aria-expanded") == "true"
                    assert page.is_visible("#siteNav.is-active")

                    # Click link and verify menu closes
                    page.click("#siteNav a[href='#work']")
                    page.wait_for_timeout(200)
                    assert page.get_attribute("#menuToggle", "aria-expanded") == "false"
                    tests_passed.append(test_name)
                except Exception as e:
                    tests_failed.append(f"{test_name}: {e}\n{traceback.format_exc()}")

            # Test 2: Desktop Navigation (1280px)
            test_name = "Desktop Navigation at 1280px"
            try:
                page.set_viewport_size({"width": 1280, "height": 900})
                page.goto("http://localhost:8088/index.html")
                page.wait_for_timeout(300)

                assert not page.is_visible("#menuToggle")
                assert page.is_visible("#siteNav")
                tests_passed.append(test_name)
            except Exception as e:
                tests_failed.append(f"{test_name}: {e}\n{traceback.format_exc()}")

            # Test 3: Bluesky URL Verification
            test_name = "Exact Bluesky Profile URL Verification"
            try:
                bluesky_link = page.get_attribute("a[href='https://bsky.app/profile/bonefaunastudios.bsky.social']", "href")
                assert bluesky_link == "https://bsky.app/profile/bonefaunastudios.bsky.social"
                tests_passed.append(test_name)
            except Exception as e:
                tests_failed.append(f"{test_name}: {e}\n{traceback.format_exc()}")

            # Test 4: STUDIO STATUS text presence
            test_name = "STUDIO STATUS Heading Presence"
            try:
                content = page.content()
                assert "STUDIO STATUS" in content
                tests_passed.append(test_name)
            except Exception as e:
                tests_failed.append(f"{test_name}: {e}\n{traceback.format_exc()}")

            # Test 5: Origins Interactive Experience & Touch the Egg -> Specimen Flow
            test_name = "Origins Interactive Archive (script.js load + Touch the Egg -> Specimen flow)"
            try:
                page.goto("http://localhost:8088/origins.html")
                page.wait_for_timeout(500)
                assert "Origins" in page.title()

                # Verify script.js loaded by checking startBtn existence
                assert page.is_visible("#startBtn")

                # Touch the Egg / Start Hatching
                page.click("#startBtn")
                page.wait_for_timeout(2500) # wait for incubation animation & specimen generation

                # Verify creature card generated
                assert page.is_visible(".card")
                assert page.is_visible(".card h2")
                assert page.is_visible(".creature")

                # Subview Navigation
                page.click("#archivesBtn")
                page.wait_for_timeout(300)
                assert page.is_visible(".completion-grid")
                page.click("#backBtn")
                page.wait_for_timeout(300)

                page.click("#loreBtn")
                page.wait_for_timeout(300)
                assert page.is_visible(".archive-list")
                page.click("#backBtn")
                page.wait_for_timeout(300)

                page.click("#achievementsBtn")
                page.wait_for_timeout(300)
                assert page.is_visible(".achievement-list")
                page.click("#backBtn")
                page.wait_for_timeout(300)

                # Back to Studio link
                page.click(".back-to-studio")
                page.wait_for_timeout(400)
                assert "Bonefauna Studios" in page.title()

                tests_passed.append(test_name)
            except Exception as e:
                tests_failed.append(f"{test_name}: {e}\n{traceback.format_exc()}")

            context.close()
            browser.close()

    finally:
        server.kill()

    # Print Report
    print("=" * 60)
    print("QA SUITE EXECUTION REPORT")
    print("=" * 60)
    print(f"STATUS: {'PASS' if len(tests_failed) == 0 else 'FAIL'}")
    print("\nPASSED TESTS:")
    for t in tests_passed:
        print(f"  [x] {t}")

    if tests_failed:
        print("\nFAILED TESTS:")
        for t in tests_failed:
            print(f"  [ ] {t}")
    else:
        print("\nFAILED TESTS:\n  None")

    print("\nCONSOLE ERRORS:")
    if console_errors:
        for err in console_errors:
            print(f"  [!] {err}")
    else:
        print("  None")
    print("=" * 60)

    if tests_failed:
        sys.exit(1)

if __name__ == "__main__":
    run_qa()
