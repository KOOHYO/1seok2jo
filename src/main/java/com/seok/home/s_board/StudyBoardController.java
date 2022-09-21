package com.seok.home.s_board;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/board/*")
public class StudyBoardController {

	@Autowired
	private StudyBoardService studyBoardService;
	
	//게시판 목록
	@GetMapping("sb_list")
	public ModelAndView setBoardList(Pager pager)throws Exception{
		List<StudyBoardDTO> ar = studyBoardService.getBoardList(pager);
		ModelAndView mv = new ModelAndView();
		mv.addObject("pager", pager);
		mv.addObject("list", ar);
		mv.setViewName("board/sb_list");
		
		return mv;
	}
	
	//게시판 상세화면
	@GetMapping("sb_detail")
	public ModelAndView getBoardDetail(StudyBoardDTO studyBoardDTO)throws Exception {
		ModelAndView mv = new ModelAndView();
		studyBoardDTO = studyBoardService.getBoardDetail(studyBoardDTO);
		mv.addObject("studyBoardDTO", studyBoardDTO);
		mv.setViewName("board/sb_detail");
		
		return mv;
	}
	
	//게시판 작성
	@GetMapping("sb_add")
	public void setBoardAdd()throws Exception {
		
	}
	@PostMapping("sb_add")
	public String setBoardAdd(StudyBoardDTO studyBoardDTO)throws Exception {
		int result = studyBoardService.setBoardAdd(studyBoardDTO);
		
		return "redirect:/board/sb_list";
	}
	
	//게시판 삭제
	@GetMapping("sb_delete")
	public String setBoardDelete(StudyBoardDTO studyBoardDTO)throws Exception{
		int result = studyBoardService.setBoardDelete(studyBoardDTO);
		
		return "redirect:/board/sb_list";
	}
	
	//게시판 수정
	@GetMapping("sb_update")
	public ModelAndView setBoardUpdate(StudyBoardDTO studyBoardDTO, ModelAndView mv)throws Exception {
		studyBoardDTO = studyBoardService.getBoardDetail(studyBoardDTO);
		mv.addObject("studyBoardDTO", studyBoardDTO);
		return mv;
	}
	
	@PostMapping("sb_update")
	@ResponseBody
	public int setBoardUpdate(StudyBoardDTO studyBoardDTO)throws Exception {
		int result = studyBoardService.setBoardUpdate(studyBoardDTO);
		return result;
	}
	
}
