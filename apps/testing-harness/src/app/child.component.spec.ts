import { HarnessLoader } from '@angular/cdk/testing';
import { ChildComponent } from './child.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { render } from '@testing-library/angular';

describe('ChildComponent', () => {
  let loader: HarnessLoader;

  beforeEach(async () => {
    const { fixture } = await render(ChildComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  describe('When init', () => {
    it('should show 1 slider, 3 checkboxes, 4 inputs, and 2 buttons', async () => {
      const inputs = await loader.getAllHarnesses(MatInputHarness);
      const checkboxes = await loader.getAllHarnesses(MatCheckboxHarness);
      const sliders = await loader.getAllHarnesses(MatSliderHarness);
      const buttons = await loader.getAllHarnesses(MatButtonHarness);
      expect(inputs.length).toBe(4);
      expect(checkboxes.length).toBe(3);
      expect(sliders.length).toBe(1);
      expect(buttons.length).toBe(2);
    });

    it('should have an initial slider thumb value of 0', async () => {
      const slider = await loader.getHarness(MatSliderHarness);
      const thumb = await slider.getEndThumb();
      expect(await thumb.getValue()).toBe(0);
    });
  });

  it.each([
    [0, 0],
    [5, 5],
    [1006, 1006],
  ])(
    'should set the slider max value to %i',
    async (maxValue, expectedMaxValue) => {
      const inputMaxValue = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-max' })
      );
      await inputMaxValue.setValue(maxValue.toString());

      const slider = await loader.getHarness(MatSliderHarness);
      expect(await slider.getMaxValue()).toBe(Number(expectedMaxValue));
    }
  );

  describe('When disabled checkbox is toggled', () => {
    it('should disable the slider', async () => {
      const checkboxes = await loader.getAllHarnesses(MatCheckboxHarness);
      const slider = await loader.getHarness(MatSliderHarness);
      await checkboxes[2].toggle();
      expect(await slider.isDisabled()).toBeTruthy();
    });
  });

  describe('Given step value set to 5, and When clicking on forward button two times', () => {
    it('should set the thumb value to 10', async () => {
      const inputStepValue = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-step' })
      );
      const slider = await loader.getHarness(MatSliderHarness);
      await inputStepValue.setValue('5');
      const thumb = await slider.getEndThumb();

      const buttonPlus = (await loader.getAllHarnesses(MatButtonHarness))[1];
      buttonPlus.click();
      buttonPlus.click();

      expect(await thumb.getValue()).toBe(10);
    });
  });

  it.each([
    [50, 10, 2, 30],
    [10, 3, 5, 0],
  ])(
    'should reduce the slider value when clicking back button 10 times, but not lower than zero',
    async (initialValue, clicks, stepSize, expectedValue) => {
      const inputStepValue = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-step' })
      );
      await inputStepValue.setValue(stepSize.toString());

      const slider = await loader.getHarness(MatSliderHarness);
      const endThumb = await slider.getEndThumb();
      endThumb.setValue(initialValue);

      const buttonBack = await loader.getAllHarnesses(MatButtonHarness);
      for (let i = 0; i < clicks; i++) {
        await buttonBack[0].click();
      }

      expect(await endThumb.getValue()).toBe(expectedValue);
    }
  );
});
