const Presentation = require('../models/Presentation');



exports.createPresentation = async (req, res) => {
  try {
    const presentation = new Presentation(req.body);
    await presentation.save();
    res.status(201).json(presentation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.getPresentationByTitle = async (req, res) => {
  try {
    const presentation = await Presentation.findOne({ title: req.params.title });
    if (!presentation) {
      return res.status(404).json({ error: 'Presentation not found' });
    }
    res.status(200).json(presentation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.addSlide = async (req, res) => {
  try {
    const presentation = await Presentation.findOne({ title: req.params.title });
    if (!presentation) {
      return res.status(404).json({ error: 'Presentation not found' });
    }
    presentation.slides.push(req.body);
    await presentation.save();
    res.status(200).json(presentation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.alterSlide = async (req, res) => {
  try {
    const presentation = await Presentation.findOne({ title: req.params.title });
    if (!presentation) {
      return res.status(404).json({ error: 'Presentation not found' });
    }
    const slide = presentation.slides.id(req.params.slideId);
    if (!slide) {
      return res.status(404).json({ error: 'Slide not found' });
    }
    Object.assign(slide, req.body);
    await presentation.save();
    res.status(200).json(presentation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.alterAuthorsList = async (req, res) => {
  try {
    const presentation = await Presentation.findOneAndUpdate(
      { title: req.params.title },
      { authors: req.body.authors },
      { new: true }
    );
    if (!presentation) {
      return res.status(404).json({ error: 'Presentation not found' });
    }
    res.status(200).json(presentation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.deleteSlide = async (req, res) => {
  try {
    const presentation = await Presentation.findOne({ title: req.params.title });
    if (!presentation) {
      return res.status(404).json({ error: 'Presentation not found' });
    }
    const slide = presentation.slides.id(req.params.slideId);
    if (!slide) {
      return res.status(404).json({ error: 'Slide not found' });
    }
    slide.remove();
    await presentation.save();
    res.status(200).json(presentation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.deletePresentation = async (req, res) => {
  try {
    const presentation = await Presentation.findOneAndDelete({ title: req.params.title });
    if (!presentation) {
      return res.status(404).json({ error: 'Presentation not found' });
    }
    res.status(200).json({ message: 'Presentation deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.getAllPresentations = async (req, res) => {
  try {
    const presentations = await Presentation.find();
    res.status(200).json(presentations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
